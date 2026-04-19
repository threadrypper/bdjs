import { DataType, IBDJSInstruction } from '../classes/internal/Instruction'

/**
 * Creates a new instruction.
 * @param instruction The instruction to create.
 * @returns The created instruction.
 * @example
 * ```js
 * const instruction = createInstruction({
 *     name: 'meow',
 *     description: 'Meows like a cat.',
 *     run: (runtime) => {
 *         console.log('Meow!')
 *     }
 * })
 * ```
 */
export function createInstruction(instruction: IBDJSInstruction) {
    if (!Object.prototype.hasOwnProperty.call(instruction, 'builder')) {
        instruction.builder = false
    }
    if (!Object.prototype.hasOwnProperty.call(instruction, 'brackets')) {
        instruction.brackets = false
    }
    if (!Object.prototype.hasOwnProperty.call(instruction, 'experimental')) {
        instruction.experimental = undefined
    }
    if (!Object.prototype.hasOwnProperty.call(instruction, 'deprecated')) {
        instruction.deprecated = undefined
    }
    if (!Object.prototype.hasOwnProperty.call(instruction, 'output')) {
        instruction.output = DataType.ANY
    }

    // Return the instruction as we ensured many properties.
    return instruction
}