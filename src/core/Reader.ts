import { Runtime } from '../classes/internal/Runtime'
import { RawFunction, RawString } from './Structures'
import { InterpretingError } from '../classes/internal/Errors'
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
	type: string
}

/**
 * Check if the provided string is word.
 * @param {string} t The string to test.
 * @returns {boolean}
 */
function isWord(t: string) {
	return /\w/.test(t)
}

const escapers = [
	['%SEMI%', ';'],
	['%COLON%', ':'],
	['%LEFT%', '['],
	['%RIGHT%', ']'],
	['%DOL%', '$']
]

/**
 * Escape a text.
 * @param text - The text to escape.
 * @returns {string}
 */
function EscapeText(text: string) {
	let result = text
	for (const escaper of escapers) {
		result = result.replace(new RegExp(`${escaper[1]}`, 'ig'), escaper[0])
	}
	return result
}

/**
 * Unescape a text.
 * @param text - The text to escape.
 * @returns {string}
 */
function UnescapeText(text: string) {
	let result = text
	for (const escaper of escapers) {
		result = result.replace(new RegExp(`${escaper[0]}`, 'ig'), escaper[1])
	}
	return result
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
			type: 'any',
			temp: new RawString()
		}

		// Reading each line character.
		for (let i = 0; i < lines.length; i++) {
			const char = lines[i]
			const next = lines[i + 1]

			if (char === '\n') compiled.line++

			if ('[' === char) compiled.depth++
			else if (']' === char) compiled.depth--

			if (compiled.type === 'any') {
				if ('$' === char && isWord(next)) {
					compiled.temp.write(char)
					compiled.type = 'function:name'
					if (compiled.string.isEmpty === false) {
						compiled.strings.push(compiled.string)
						compiled.string = new RawString()
					}
				} else compiled.string.write(char)
			} else {
				const [start, mode] = compiled.type.split(':')
				if (mode === 'name') {
					if (!/\w/.test(char) && char !== '[') {
						compiled.function
							.setName(compiled.temp.value)
							.setLine(compiled.line)
							.setIndex(compiled.functions.length)
							.setClosed(true)
						compiled.strings.push(
							new RawString().overwrite(`(call_${compiled.functions.length})`)
						)
						compiled.functions.push(compiled.function)
						compiled.function = new RawFunction()
						compiled.temp = new RawString()
						compiled.type = 'any'
						compiled.string.write(char)
					} else if ('[' === char) {
						compiled.type = 'function:parameters'
						compiled.function
							.setName(compiled.temp.value)
							.setLine(compiled.line)
							.setIndex(compiled.functions.length)
						compiled.temp = new RawString()
					} else compiled.temp.write(char)
				} else if (mode === 'parameters') {
					if (';' === char && compiled.depth <= 1) {
						compiled.function.addField(compiled.temp.value)
						compiled.temp = new RawString()
					} else if (']' === char && compiled.depth <= 0) {
						compiled.function.addField(compiled.temp.value).setClosed(true)
						compiled.strings.push(
							new RawString().overwrite(`(call_${compiled.functions.length})`)
						)
						compiled.functions.push(compiled.function)
						compiled.function = new RawFunction()
						compiled.temp = new RawString()
						compiled.type = 'any'
					} else compiled.temp.write(char)
				}
			}
		}

		if (compiled.string.isEmpty === false) {
			compiled.strings.push(compiled.string)
			compiled.string = new RawString()
		}

		if (compiled.function.name !== '') {
			compiled.functions.push(compiled.function)
			compiled.function = new RawFunction()
		}

		if (
			compiled.temp.value.startsWith('$') &&
			compiled.type.startsWith('function')
		) {
			compiled.strings.push(
				new RawString().overwrite(`(call_${compiled.functions.length})`)
			)

			const rest = new RawFunction()
				.setName(compiled.temp.value)
				.setClosed(true)
				.setIndex(compiled.functions.length)
				.setLine(compiled.line)

			compiled.functions.push(rest)
			compiled.temp = new RawString()
			compiled.type = 'any'
		}

		return compiled
	}

	static async interpret(compiledData: CompiledData, runtime: Runtime) {
		const parsedFunctions: string[] = []
		const texts = compiledData.strings.map(str => str.value)

		for (const dfunc of compiledData.functions) {
			if (runtime.mustStop) break

			const spec = runtime.instructions.get(dfunc.name.slice(1).toLowerCase())
			if (!spec)
				throw new InterpretingError(
					[
						`"${dfunc.name}" is not a function.`,
						'|-> Please provide a valid function name at:',
						`|-> Line: ${dfunc.line}`,
						`|-> Source: "${dfunc.toString}"`,
						'|--------------------------------------------'
					].join('\n')
				)

			if (dfunc.closed === false)
				throw new InterpretingError(
					[
						`"${dfunc.name}" is not a closed.`,
						'|-> Please make sure to close function fields at:',
						`|-> Line: ${dfunc.line}`,
						`|-> Source: "${dfunc.toString}"`,
						'|-------------------------------------------------'
					].join('\n')
				)

			runtime.self.data = spec
			runtime.self.raw = dfunc
			const fields = dfunc.fields.map(field => field.value)
			const newFields: string[] = []

			for (let idx = 0; idx < fields.length; idx++) {
				const field = fields[idx]
				const compile = spec.interpret

				const parsed = compile
					? ((await Reader.compileAndInterpret(field, runtime))?.getResultString() ?? '')
					: field
				newFields.push(Reader.unescapeParam(parsed, spec.args?.at(idx)))
			}

			const result = await spec.run(runtime, newFields)

			if (result.isError()) {
				throw new InterpretingError(
					[
						`"${dfunc.name}" returned an error.`,
						'|-> Please check the function arguments at:',
						`|-> Line: ${dfunc.line}`,
						`|-> Source: "${dfunc.toString}"`,
						'|-------------------------------------------------'
					].join('\n')
				)
			}

			parsedFunctions[parsedFunctions.length] =
				result.value === '' ? '' : result.value
		}

		parsedFunctions.forEach((text, index) => {
			texts[texts.indexOf(`(call_${index})`)] = text
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
		return allowed ? UnescapeText(value) : value
	}
}
