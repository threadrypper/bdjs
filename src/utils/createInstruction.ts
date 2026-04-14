import { IBDJSInstruction } from '../classes/internal/Instruction'

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
    return instruction
}