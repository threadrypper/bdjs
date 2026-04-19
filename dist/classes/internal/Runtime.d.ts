import { CompiledData } from '../../core/Reader';
import { RawFunction } from '../../core/Structures';
import { IBDJSInstruction } from './Instruction';
import type { DiscordClient } from '../structures/DiscordClient';
import { InstructionManager } from '../../managers/InstructionManager';
interface InstructionSelfArg {
    /**
     * The instruction data.
     */
    data: IBDJSInstruction;
    /**
     * The raw function compiled by the reader.
     */
    raw: RawFunction;
    /**
     * The unwrapped arguments of the instruction.
     */
    unwrapped: string[];
}
export declare class Runtime {
    #private;
    /**
     * The discord client.
     */
    client: DiscordClient;
    /**
     * The self argument for the instruction.
     */
    self: InstructionSelfArg;
    /**
     * The instruction manager.
     */
    instructions: InstructionManager;
    /**
     * Gets the compiled arguments of the instruction.
     * @returns {Array<string>} The compiled arguments.
     */
    getCompiledArgs(): string[];
    /**
     * Set the result string of the interpretation phase.
     * @param result The result string.
     */
    setResultString(result: string): void;
    /**
     * Gets the result string.
     * @returns {string}
     */
    getResultString(): string;
    /**
     * Set the compiled data of the interpretation phase.
     * @param compiledData The compiled data.
     */
    setCompiledData(compiledData: CompiledData): void;
    /**
     * Gets the compiled data.
     * @returns {CompiledData}
     */
    getCompiledData(): CompiledData;
    /**
     * Sets an environment variable.
     * NOT ACCESIBLE USING `$let`.
     * @param {string} name The name of the environment variable.
     * @param {unknown} value The value of the environment variable.
     */
    setEnvironmentVariable(name: string, value: unknown): void;
    /**
     * Gets an environment variable.
     * NOT ACCESIBLE USING `$get`.
     * @param {string} name The name of the environment variable.
     * @returns {unknown}
     */
    getEnvironmentVariable(name: string): unknown;
    /**
     * Makes the runtime stop its execution.
     * @param state Whether the runtime must stop.
     */
    makeStop(state?: boolean): void;
    /**
     * Gets whether the runtime must stop its execution.
     * @returns {boolean}
     */
    get mustStop(): boolean;
}
export {};
