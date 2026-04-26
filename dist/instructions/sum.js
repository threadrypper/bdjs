"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$sum',
    description: 'Calculates the sum of a list of two numbers.',
    interpret: true,
    args: [
        {
            name: 'Number 1',
            description: 'The first number to sum.',
            required: true,
            type: Instruction_1.DataType.NUMBER,
            spread: false
        },
        {
            name: 'Number 2',
            description: 'The second number to sum.',
            required: true,
            type: Instruction_1.DataType.NUMBER,
            spread: false
        }
    ],
    output: Instruction_1.DataType.NUMBER,
    run: (runtime) => {
        const [number1, number2] = runtime.getCompiledArgs().map(n => parseInt(n));
        const sum = number1 + number2;
        if (isNaN(sum))
            return Output_1.Output.ok('NaN');
        return Output_1.Output.ok(sum.toString());
    }
});
