import type { IBDJSInstruction } from '../classes/internal/Instruction'
import { readdirSync } from 'fs'
import { join } from 'path'

/**
 * Manages instructions.
 */
export class InstructionManager extends Map<string, IBDJSInstruction> {
    /**
     * Loads instructions from a directory.
     * @param {string} directory The directory to load instructions from.
     */
    load(directory: string, filter: (instruction: IBDJSInstruction) => boolean = () => true) { }
}
