import type { IBDJSInstruction } from '../classes/internal/Instruction';
/**
 * Manages instructions.
 */
export declare class InstructionManager extends Map<string, IBDJSInstruction> {
    /**
     * Registry for builder instructions.
     */
    builders: Map<string, IBDJSInstruction>;
    /**
     * The runtime name this manager is for.
     */
    name: string;
    /**
     * Loads instructions from a directory.
     * @param {string} directory The directory to load instructions from.
     */
    load(directory: string): void;
    /**
     * Enables cached builders.
     * @param filter Filter for the builders to enable.
     */
    enableCachedBuilders(filter?: (instruction: IBDJSInstruction) => boolean): void;
    /**
     * Disables builders.
     * @param filter Filter for the builders to disable.
     */
    disableBuilders(filter?: (instruction: IBDJSInstruction) => boolean): boolean;
}
