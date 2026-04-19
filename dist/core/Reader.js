"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = exports.Parser = void 0;
const Structures_1 = require("./Structures");
const Errors_1 = require("../classes/internal/Errors");
const Output_1 = require("../classes/internal/Output");
/**
 * Check if the provided string is word.
 * @param {string} t The string to test.
 * @returns {boolean}
 */
const isWord = (char) => !!char && /\w/.test(char);
/**
 * Represents the escapers.
 */
const ESCAPERS = new Map([
    [':', '%COLON%'],
    [';', '%SEMI%'],
    ['[', '%LEFT%'],
    [']', '%RIGHT%'],
    ['$', '%DOL%']
]);
/**
 * Represents the unescapers.
 */
const UNESCAPERS = new Map([...ESCAPERS.entries()].map(([k, v]) => [v, k]));
/**
 * Regex to match any escaper.
 */
const ESCAPE_REGEX = new RegExp(`(${[...ESCAPERS.keys()].join('')})`, 'g');
/**
 * Regex to match any unescaper.
 */
const UNESCAPE_REGEX = new RegExp(`(${[...ESCAPERS.values()].join('|')})`, 'g');
/**
 * Escape a text.
 * @param text - The text to escape.
 * @returns {string}
 */
function escapeText(text) {
    return text.replace(ESCAPE_REGEX, (match) => ESCAPERS.get(match) || match);
}
/**
 * Unescape a text.
 * @param text - The text to escape.
 * @returns {string}
 */
function unescapeText(text) {
    return text.replace(UNESCAPE_REGEX, m => UNESCAPERS.get(m) ?? m);
}
/**
 * Removes unsafe text from code results.
 * @param text - Text to be enhanced.
 * @returns {string}
 */
function removeUnsafeText(text) {
    return text.replace(/\(call_\d+\)/g, '');
}
/**
 * Represents the state of the reader.
 */
var ReaderState;
(function (ReaderState) {
    ReaderState[ReaderState["Any"] = 0] = "Any";
    ReaderState[ReaderState["FunctionName"] = 1] = "FunctionName";
    ReaderState[ReaderState["FunctionParameters"] = 2] = "FunctionParameters";
})(ReaderState || (ReaderState = {}));
/**
 * Resolves a field value.
 * @param {string} field - The field value.
 * @param {boolean} shouldCompile - Whether to compile the field value.
 * @param {Runtime} runtime - The runtime to use.
 * @returns {Promise<string>}
 */
async function resolveField(field, shouldCompile, runtime) {
    if (!shouldCompile)
        return field;
    const result = await Interpreter.parseAndRun(field, runtime);
    return result?.getResultString() ?? '';
}
/**
 * Unescapes a function parameter.
 * @param {string} value - The parameter value.
 * @param {InstructionArgOptions} spec - Parameter specificaction.
 * @returns {string}
 */
function unescapeParam(value, spec) {
    if (!spec)
        return value;
    const allowed = !!spec.unescape;
    return allowed ? unescapeText(value) : value;
}
/**
 * BDJS code parser.
 */
class Parser {
    /**
     * Parses BDJS code.
     * @param {string} code BDJS code to read.
     * @returns {CompiledData}
     */
    static parse(code) {
        const lines = code
            .trim()
            .split('\n')
            .map(line => line.trim())
            .join('\n');
        const ctx = {
            function: new Structures_1.RawFunction(),
            string: new Structures_1.RawString(),
            depth: 0,
            line: 1,
            state: ReaderState.Any,
            temp: new Structures_1.RawString()
        };
        const compiled = {
            functions: [],
            strings: []
        };
        /**
         * Flushes the current string to the compiled data.
         * @returns {void}
         */
        const flushString = () => {
            if (ctx.string.isEmpty)
                return;
            compiled.strings.push(ctx.string);
            ctx.string = new Structures_1.RawString();
        };
        /**
         * Injects a call reference to the compiled strings data to save its position.
         * @returns {void}
         */
        const injectCallRef = () => {
            compiled.strings.push(new Structures_1.RawString().overwrite(`(call_${compiled.functions.length})`));
        };
        /**
         * Pushes the current function to the compiled data.
         * @param {boolean} closed Whether the function is closed.
         * @returns {void}
         */
        const pushFunction = (closed = true) => {
            ctx.function
                .setName(ctx.temp.value)
                .setLine(ctx.line)
                .setIndex(compiled.functions.length)
                .setClosed(closed);
            injectCallRef();
            compiled.functions.push(ctx.function);
            ctx.function = new Structures_1.RawFunction();
            ctx.temp = new Structures_1.RawString();
        };
        // Reading each line character.
        for (let i = 0; i < lines.length; i++) {
            const char = lines[i];
            const next = lines[i + 1];
            if (char === '\n')
                ctx.line++;
            if ('[' === char)
                ctx.depth++;
            else if (']' === char)
                ctx.depth--;
            switch (ctx.state) {
                // Collecting everything else.
                case ReaderState.Any: {
                    if ('$' === char && isWord(next)) {
                        flushString();
                        ctx.temp.write(char);
                        ctx.state = ReaderState.FunctionName;
                    }
                    else
                        ctx.string.write(char);
                    break;
                }
                // Compiling $function
                case ReaderState.FunctionName: {
                    if (!/\w/.test(char) && char !== '[') {
                        pushFunction(true);
                        ctx.state = ReaderState.Any;
                        ctx.string.write(char);
                    }
                    else if ('[' === char) {
                        ctx.state = ReaderState.FunctionParameters;
                        ctx.function
                            .setName(ctx.temp.value)
                            .setLine(ctx.line)
                            .setIndex(compiled.functions.length);
                        ctx.temp = new Structures_1.RawString();
                    }
                    else
                        ctx.temp.write(char);
                    break;
                }
                // Compiling [...ARGS]
                case ReaderState.FunctionParameters: {
                    // If the depth is less than 0, it means there is an unexpected closing bracket.
                    if (ctx.depth < 0) {
                        throw new Errors_1.ReadingError([
                            `Unexpected closing bracket.`,
                            '|-> Please make sure to close function fields correctly at:',
                            `|-> Line: ${ctx.line}`,
                            `|-> Source: "${ctx.function.toString}"`,
                            '|-------------------------------------------------'
                        ].join('\n'));
                    }
                    if (';' === char && ctx.depth === 1) {
                        ctx.function.addField(ctx.temp.value);
                        ctx.temp = new Structures_1.RawString();
                    }
                    else if (']' === char && ctx.depth === 0) {
                        ctx.function.addField(ctx.temp.value)
                            .setClosed(true);
                        injectCallRef();
                        compiled.functions.push(ctx.function);
                        ctx.function = new Structures_1.RawFunction();
                        ctx.temp = new Structures_1.RawString();
                        ctx.state = ReaderState.Any;
                    }
                    else
                        ctx.temp.write(char);
                    break;
                }
            }
        }
        flushString(); // Just in case.
        if (ctx.function.name !== '') {
            compiled.functions.push(ctx.function);
            ctx.function = new Structures_1.RawFunction();
        }
        if (ctx.temp.value.startsWith('$') &&
            (ctx.state === ReaderState.FunctionName || ctx.state === ReaderState.FunctionParameters)) {
            injectCallRef();
            const rest = new Structures_1.RawFunction()
                .setName(ctx.temp.value)
                .setClosed(true)
                .setIndex(compiled.functions.length)
                .setLine(ctx.line);
            compiled.functions.push(rest);
            ctx.temp = new Structures_1.RawString();
            ctx.state = ReaderState.Any;
        }
        return compiled;
    }
}
exports.Parser = Parser;
/**
 * BDJS code interpreter.
 */
class Interpreter {
    /**
     * Runs the compiled BDJS code.
     * @param {CompiledData} compiledData Compiled BDJS code.
     * @param {Runtime} runtime Runtime to use.
     * @returns {Promise<Runtime>}
     */
    static async run(compiledData, runtime) {
        const parsedFunctions = [];
        const texts = compiledData.strings.map(str => str.value);
        for (const currentCompiledFunction of compiledData.functions) {
            if (runtime.mustStop)
                break;
            const instruction = runtime.instructions.get(currentCompiledFunction.name.slice(1).toLowerCase());
            if (!instruction)
                throw new Errors_1.InterpretingError([
                    `"${currentCompiledFunction.name}" is not a function.`,
                    '|-> Please provide a valid function name at:',
                    `|-> Line: ${currentCompiledFunction.line}`,
                    `|-> Source: "${currentCompiledFunction.toString}"`,
                    '|--------------------------------------------'
                ].join('\n'));
            if (currentCompiledFunction.closed === false)
                throw new Errors_1.InterpretingError([
                    `"${currentCompiledFunction.name}" is not a closed.`,
                    '|-> Please make sure to close function fields at:',
                    `|-> Line: ${currentCompiledFunction.line}`,
                    `|-> Source: "${currentCompiledFunction.toString}"`,
                    '|-------------------------------------------------'
                ].join('\n'));
            runtime.self.data = instruction;
            runtime.self.raw = currentCompiledFunction;
            const fields = runtime.getCompiledArgs();
            const newFields = [];
            const shouldCompile = instruction.interpret;
            for (let idx = 0; idx < fields.length; idx++) {
                const field = fields[idx];
                const parsed = await resolveField(field, shouldCompile, runtime);
                newFields.push(unescapeParam(parsed, instruction.args?.at(idx)));
            }
            runtime.self.unwrapped = newFields;
            const output = await instruction.run(runtime);
            switch (output.type) {
                case Output_1.OutputType.ERROR: {
                    throw new Errors_1.InterpretingError([
                        `"${currentCompiledFunction.name}" returned an error.`,
                        '|-> Please check the function arguments at:',
                        `|-> Line: ${currentCompiledFunction.line}`,
                        `|-> Source: "${currentCompiledFunction.toString}"`,
                        '|-------------------------------------------------'
                    ].join('\n'));
                }
                case Output_1.OutputType.STOP: {
                    runtime.makeStop();
                    break;
                }
                case Output_1.OutputType.EMPTY: {
                    parsedFunctions.push('');
                    break;
                }
                case Output_1.OutputType.OK:
                default: {
                    parsedFunctions.push(output.value);
                    break;
                }
            }
        }
        parsedFunctions.forEach((text, index) => {
            const callIndex = texts.indexOf(`(call_${index})`);
            if (callIndex !== -1)
                texts[callIndex] = text;
        });
        runtime.setResultString(removeUnsafeText(texts.join('').trim()));
        runtime.setCompiledData(compiledData);
        return runtime;
    }
    /**
     * Parses and interprets BDJS code.
     * Shorthand for `Parser.parse(code)` and `Interpreter.run(compiledData, runtime)`.
     * @param {string} code BDJS code to parse and interpret.
     * @param {Runtime} runtime Runtime to use.
     * @returns {Promise<Runtime>}
     */
    static async parseAndRun(code, runtime) {
        const compiledData = Parser.parse(code);
        return await Interpreter.run(compiledData, runtime);
    }
}
exports.Interpreter = Interpreter;
