import type { IBDJSInstruction } from '../classes/internal/Instruction'
import { recursiveReaddir } from '@utils/recursiveReaddir'

/**
 * Checks if an instruction should be loaded.
 * @param {IBDJSInstruction} instruction The instruction to check.
 * @returns {boolean} True if the instruction should be loaded, false otherwise.
 */
function shouldLoad(instruction: IBDJSInstruction): boolean {
    return !instruction.builder
}

/**
 * Manages instructions.
 */
export class InstructionManager extends Map<string, IBDJSInstruction> {
    /**
     * Loads instructions from a directory.
     * @param {string} directory The directory to load instructions from.
     */
    load(directory: string, filter: (instruction: IBDJSInstruction) => boolean = shouldLoad) {
        const files = recursiveReaddir(directory, f => f.endsWith('.js'))
        for (const file of files) {
            const instruction = require(file).data
            if (filter(instruction)) {
                this.set(instruction.name.slice(1).toLowerCase(), instruction)
            }
        }
    }
}
