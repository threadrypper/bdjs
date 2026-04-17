import { Runtime } from '../classes/internal/Runtime';
import { RawFunction, RawString } from './Structures';
import { InstructionArgOptions } from '../classes/internal/Instruction';
/**
 * Represents the compiled data by BDJS reader.
 */
export interface CompiledData {
    functions: RawFunction[];
    function: RawFunction;
    strings: RawString[];
    string: RawString;
    temp: RawString;
    depth: number;
    line: number;
    type: string;
}
/**
 * BDJS code reader.
 */
export declare class Reader {
    /**
     * Reads BDJS code.
     * @param {string} code BDJS code to read.
     * @returns {CompiledData}
     */
    static compile(code: string): CompiledData;
    static interpret(compiledData: CompiledData, runtime: Runtime): Promise<Runtime>;
    /**
     * Compiles and interprets BDJS code.
     * Shorthand for `Reader.compile(code)` and `Reader.interpret(compiledData, runtime)`.
     * @param {string} code BDJS code to compile and interpret.
     * @param {Runtime} runtime Runtime to use.
     * @returns {Promise<Runtime>}
     */
    static compileAndInterpret(code: string, runtime: Runtime): Promise<Runtime>;
    /**
     * Unescapes a function parameter.
     * @param value - The parameter value.
     * @param spec - Parameter specificaction.
     * @returns {string}
     */
    static unescapeParam(value: string, spec?: InstructionArgOptions): string;
}
