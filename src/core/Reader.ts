import { Runtime } from '../classes/internal/Runtime'
import { RawFunction, RawString } from './Structures'
import { InterpretingError, ReadingError } from '../classes/internal/Errors'
import { InstructionArgOptions } from '../classes/internal/Instruction'

/**
 * Represents the compiled data by BDJS reader.
 */
export interface CompiledData {
	functions: RawFunction[]
	function: RawFunction
	strings: RawString[]
	string: RawString
	temp: RawString
	depth: number
	line: number
	state: ReaderState
}

/**
 * Check if the provided string is word.
 * @param {string} t The string to test.
 * @returns {boolean}
 */
const isWord = (char?: string): char is string => !!char && /\w/.test(char)

/**
 * Represents the escapers.
 */
const ESCAPERS = new Map<string, string>([
	[':', '%COLON%'],
	[';', '%SEMI%'],
	['[', '%LEFT%'],
	[']', '%RIGHT%'],
	['$', '%DOL%']
])

/**
 * Represents the unescapers.
 */
const UNESCAPERS = new Map(
	[...ESCAPERS.entries()].map(([k, v]) => [v, k])
)

/**
 * Regex to match any escaper.
 */
const ESCAPE_REGEX = new RegExp(`(${[...ESCAPERS.keys()].join('')})`, 'g')

/**
 * Regex to match any unescaper.
 */
const UNESCAPE_REGEX = new RegExp(`(${[...ESCAPERS.values()].join('|')})`, 'g')

/**
 * Escape a text.
 * @param text - The text to escape.
 * @returns {string}
 */
function escapeText(text: string) {
	return text.replace(ESCAPE_REGEX, (match) => ESCAPERS.get(match) || match)
}

/**
 * Unescape a text.
 * @param text - The text to escape.
 * @returns {string}
 */
function unescapeText(text: string) {
	return text.replace(UNESCAPE_REGEX, m => UNESCAPERS.get(m) ?? m)
}

/**
 * Removes unsafe text from code results.
 * @param text - Text to be enhanced.
 * @returns {string}
 */
function removeUnsafeText(text: string) {
	return text.replace(/(\(call_\d+\))/g, '')
}

/**
 * Represents the state of the reader.
 */
enum ReaderState {
	Any,
	FunctionName,
	FunctionParameters
}

/**
 * BDJS code reader.
 */
export class Reader {
	/**
	 * Reads BDJS code.
	 * @param {string} code BDJS code to read.
	 * @returns {CompiledData}
	 */
	static compile(code: string): CompiledData {
		const lines = code
			.trim()
			.split('\n')
			.map(line => line.trim())
			.join('\n')

		const compiled: CompiledData = {
			functions: [],
			strings: [],
			function: new RawFunction(),
			string: new RawString(),
			depth: 0,
			line: 1,
			state: ReaderState.Any,
			temp: new RawString()
		}

		/**
		 * Flushes the current string to the compiled data.
		 * @returns {void}
		 */
		const flushString = () => {
			if (compiled.string.isEmpty) return;
			compiled.strings.push(compiled.string)
			compiled.string = new RawString()
		}

		/**
		 * Injects a call reference to the compiled strings data to save its position.
		 * @returns {void}
		 */
		const injectCallRef = () => {
			compiled.strings.push(
				new RawString().overwrite(`(call_${compiled.functions.length})`)
			);
		}

		/**
		 * Pushes the current function to the compiled data.
		 * @param {boolean} closed Whether the function is closed.
		 * @returns {void}
		 */
		const pushFunction = (closed = true) => {
			compiled.function
				.setName(compiled.temp.value)
				.setLine(compiled.line)
				.setIndex(compiled.functions.length)
				.setClosed(closed);

			injectCallRef()

			compiled.functions.push(compiled.function)

			compiled.function = new RawFunction()
			compiled.temp = new RawString()
		}

		// Reading each line character.
		for (let i = 0; i < lines.length; i++) {
			const char = lines[i]
			const next = lines[i + 1]

			if (char === '\n') compiled.line++

			if ('[' === char) compiled.depth++
			else if (']' === char) compiled.depth--

			switch (compiled.state) {
				// Collecting everything else.
				case ReaderState.Any: {
					if ('$' === char && isWord(next)) {
						flushString()
						compiled.temp.write(char)
						compiled.state = ReaderState.FunctionName
					} else compiled.string.write(char)
					break
				}

				// Compiling $function
				case ReaderState.FunctionName: {
					if (!/\w/.test(char) && char !== '[') {
						pushFunction(true)
						compiled.state = ReaderState.Any
						compiled.string.write(char)
					} else if ('[' === char) {
						compiled.state = ReaderState.FunctionParameters
						compiled.function
							.setName(compiled.temp.value)
							.setLine(compiled.line)
							.setIndex(compiled.functions.length)
						compiled.temp = new RawString()
					} else compiled.temp.write(char)
					break
				}

				// Compiling [...ARGS]
				case ReaderState.FunctionParameters: {
					// If the depth is less than 0, it means there is an unexpected closing bracket.
					if (compiled.depth < 0) {
						throw new ReadingError(
							[
								`Unexpected closing bracket.`,
								'|-> Please make sure to close function fields correctly at:',
								`|-> Line: ${compiled.line}`,
								`|-> Source: "${compiled.function.toString}"`,
								'|-------------------------------------------------'
							].join('\n')
						)
					}

					if (';' === char && compiled.depth <= 1) {
						compiled.function.addField(compiled.temp.value)
						compiled.temp = new RawString()
					} else if (']' === char && compiled.depth === 0) {
						compiled.function.addField(compiled.temp.value)
							.setClosed(true);

						injectCallRef()

						compiled.functions.push(compiled.function)
						compiled.function = new RawFunction()
						compiled.temp = new RawString()

						compiled.state = ReaderState.Any
					} else compiled.temp.write(char)
					break
				}
			}
		}

		flushString() // Just in case.

		if (compiled.function.name !== '') {
			compiled.functions.push(compiled.function)
			compiled.function = new RawFunction()
		}

		if (
			compiled.temp.value.startsWith('$') &&
			(compiled.state === ReaderState.FunctionName || compiled.state === ReaderState.FunctionParameters)
		) {
			injectCallRef()

			const rest = new RawFunction()
				.setName(compiled.temp.value)
				.setClosed(true)
				.setIndex(compiled.functions.length)
				.setLine(compiled.line)

			compiled.functions.push(rest)
			compiled.temp = new RawString()
			compiled.state = ReaderState.Any
		}

		return compiled
	}

	static async interpret(compiledData: CompiledData, runtime: Runtime) {
		const parsedFunctions: string[] = []
		const texts = compiledData.strings.map(str => str.value)

		for (const currentCompiledFunction of compiledData.functions) {
			if (runtime.mustStop) break

			const instruction = runtime.instructions.get(currentCompiledFunction.name.slice(1).toLowerCase())
			if (!instruction)
				throw new InterpretingError(
					[
						`"${currentCompiledFunction.name}" is not a function.`,
						'|-> Please provide a valid function name at:',
						`|-> Line: ${currentCompiledFunction.line}`,
						`|-> Source: "${currentCompiledFunction.toString}"`,
						'|--------------------------------------------'
					].join('\n')
				)

			if (currentCompiledFunction.closed === false)
				throw new InterpretingError(
					[
						`"${currentCompiledFunction.name}" is not a closed.`,
						'|-> Please make sure to close function fields at:',
						`|-> Line: ${currentCompiledFunction.line}`,
						`|-> Source: "${currentCompiledFunction.toString}"`,
						'|-------------------------------------------------'
					].join('\n')
				)

			runtime.self.data = instruction
			runtime.self.raw = currentCompiledFunction
			const fields = currentCompiledFunction.fields.map(field => field.value)
			const newFields: string[] = []

			for (let idx = 0; idx < fields.length; idx++) {
				const field = fields[idx]
				const compile = instruction.interpret

				const parsed = compile
					? ((await Reader.compileAndInterpret(field, runtime))?.getResultString() ?? '')
					: field
				newFields.push(Reader.unescapeParam(parsed, instruction.args?.at(idx)))
			}

			const result = await instruction.run(runtime, newFields)

			if (result.isError()) {
				throw new InterpretingError(
					[
						`"${currentCompiledFunction.name}" returned an error.`,
						'|-> Please check the function arguments at:',
						`|-> Line: ${currentCompiledFunction.line}`,
						`|-> Source: "${currentCompiledFunction.toString}"`,
						'|-------------------------------------------------'
					].join('\n')
				)
			}

			parsedFunctions.push(result.value ?? '')
		}

		parsedFunctions.forEach((text, index) => {
			const callIndex = texts.indexOf(`(call_${index})`)
			if (callIndex !== -1) texts[callIndex] = text
		})

		runtime.setResultString(removeUnsafeText(texts.join('').trim()))
		runtime.setCompiledData(compiledData)
		return runtime
	}

	/**
	 * Compiles and interprets BDJS code.
	 * Shorthand for `Reader.compile(code)` and `Reader.interpret(compiledData, runtime)`.
	 * @param {string} code BDJS code to compile and interpret.
	 * @param {Runtime} runtime Runtime to use.
	 * @returns {Promise<Runtime>}
	 */
	static async compileAndInterpret(code: string, runtime: Runtime) {
		const compiledData = Reader.compile(code)
		return await Reader.interpret(compiledData, runtime)
	}

	/**
	 * Unescapes a function parameter.
	 * @param value - The parameter value.
	 * @param spec - Parameter specificaction.
	 * @returns {string}
	 */
	static unescapeParam(value: string, spec?: InstructionArgOptions) {
		if (!spec) return value
		const allowed = !!spec.unescape
		return allowed ? unescapeText(value) : value
	}
}
