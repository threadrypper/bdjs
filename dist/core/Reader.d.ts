import { Runtime } from '../classes/internal/Runtime';
import { RawFunction, RawString } from './Structures';
/**
 * Internal parser context.
 */
export interface ParserContext {
    function: RawFunction;
    string: RawString;
    temp: RawString;
    depth: number;
    line: number;
    state: ReaderState;
}
/**
 * Represents the compiled data by BDJS reader.
 */
export interface CompiledData {
    functions: RawFunction[];
    strings: RawString[];
}
/**
 * Represents the state of the reader.
 */
declare enum ReaderState {
    Any = 0,
    FunctionName = 1,
    FunctionParameters = 2
}
export declare class Parser {
    /**
     * Parses BDJS code.
     * @param {string} code BDJS code to read.
     * @returns {CompiledData}
     */
    static parse(code: string): CompiledData;
}
/**
 * BDJS code interpreter.
 */
export declare class Interpreter {
    static run(compiledData: CompiledData, runtime: Runtime): Promise<Runtime>;
    /**
     * Parses and interprets BDJS code.
     * Shorthand for `Parser.parse(code)` and `Interpreter.run(compiledData, runtime)`.
     * @param {string} code BDJS code to parse and interpret.
     * @param {Runtime} runtime Runtime to use.
     * @returns {Promise<Runtime>}
     */
    static parseAndRun(code: string, runtime: Runtime): Promise<Runtime>;
}
export {};
