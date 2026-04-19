"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInstruction = createInstruction;
const Instruction_1 = require("../classes/internal/Instruction");
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
function createInstruction(instruction) {
    if (!Object.prototype.hasOwnProperty.call(instruction, 'builder')) {
        instruction.builder = false;
    }
    if (!Object.prototype.hasOwnProperty.call(instruction, 'brackets')) {
        instruction.brackets = false;
    }
    if (!Object.prototype.hasOwnProperty.call(instruction, 'experimental')) {
        instruction.experimental = undefined;
    }
    if (!Object.prototype.hasOwnProperty.call(instruction, 'deprecated')) {
        instruction.deprecated = undefined;
    }
    if (!Object.prototype.hasOwnProperty.call(instruction, 'output')) {
        instruction.output = Instruction_1.DataType.ANY;
    }
    // Return the instruction as we ensured many properties.
    return instruction;
}
