"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$sub',
    description: 'Calculates the difference between two numbers.',
    interpret: true,
    args: [
        {
            name: 'Minuend',
            description: 'The number from which another number is to be subtracted.',
            required: true,
            type: Instruction_1.DataType.NUMBER,
            spread: false
        },
        {
            name: 'Subtrahend',
            description: 'The number to be subtracted.',
            required: true,
            type: Instruction_1.DataType.NUMBER,
            spread: false
        }
    ],
    output: Instruction_1.DataType.NUMBER,
    run: (runtime) => {
        const [minuend, subtrahend] = runtime.getCompiledArgs().map(n => parseInt(n));
        const difference = minuend - subtrahend;
        if (isNaN(difference))
            return Output_1.Output.ok('NaN');
        return Output_1.Output.ok(difference.toString());
    }
});
