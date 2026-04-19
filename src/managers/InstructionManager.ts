import { normalizeInstructionName } from '@utils/normalizeInstructionName'
import type { BuilderInstruction, IBDJSInstruction } from '../classes/internal/Instruction'
import { recursiveReaddir } from '@utils/recursiveReaddir'

/**
 * Adds an instruction to a registry.
 * @param registry The registry to add the instruction to.
 * @param instruction The instruction to add.
 */
const addInstruction = (
    registry: Map<string, IBDJSInstruction>,
    instruction: IBDJSInstruction
) => {
    registry.set(normalizeInstructionName(instruction.name), instruction)
}

/**
 * Checks if an instruction is a builder.
 * @param instruction The instruction to check.
 * @returns {boolean}
 */
const isBuilder = (instruction: unknown): instruction is BuilderInstruction => {
    return typeof instruction === 'object' && instruction !== null && 'builder' in instruction && typeof instruction.builder === 'boolean' && instruction.builder === true
}

/**
 * Manages instructions.
 */
export class InstructionManager extends Map<string, IBDJSInstruction> {
    /**
     * Registry for builder instructions.
     */
    builders = new Map<string, IBDJSInstruction>()
    /**
     * The runtime name this manager is for.
     */
    name = 'global'
    /**
     * Loads instructions from a directory.
     * @param {string} directory The directory to load instructions from.
     */
    load(directory: string) {
        const files = recursiveReaddir(directory, f => f.endsWith('.js'))
        const loadedInstructions = files.map((directory) => require(directory).data) as IBDJSInstruction[]

        for (const instruction of loadedInstructions) {
            if (isBuilder(instruction)) {
                addInstruction(this.builders, instruction)
                continue
            }

            addInstruction(this, instruction)
        }
    }

    /**
     * Enables cached builders.
     * @param filter Filter for the builders to enable.
     */
    enableCachedBuilders(filter: (instruction: IBDJSInstruction) => boolean = () => false) {
        for (const instruction of this.builders.values()) {
            if (filter(instruction)) {
                addInstruction(this, instruction)
            }
        }
    }

    /**
     * Disables builders.
     * @param filter Filter for the builders to disable.
     */
    disableBuilders(filter: (instruction: IBDJSInstruction) => boolean = () => false) {
        const addedBuilders = Array.from(this.values()).filter(isBuilder)
        const currentSize = this.size

        for (const instruction of addedBuilders) {
            if (filter(instruction) && this.has(normalizeInstructionName(instruction.name))) {
                this.delete(normalizeInstructionName(instruction.name))
            }
        }

        return this.size < currentSize
    }
}
