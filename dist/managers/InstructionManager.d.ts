import type { IBDJSInstruction } from '../classes/internal/Instruction';
/**
 * Manages instructions.
 */
export declare class InstructionManager extends Map<string, IBDJSInstruction> {
    /**
     * Loads instructions from a directory.
     * @param {string} directory The directory to load instructions from.
     */
    load(directory: string, filter?: (instruction: IBDJSInstruction) => boolean): void;
}
