"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$div',
    description: 'Calculates the quotient of two numbers.',
    interpret: true,
    args: [
        {
            name: 'Dividend',
            description: 'The number to be divided.',
            required: true,
            type: Instruction_1.DataType.NUMBER,
            spread: false
        },
        {
            name: 'Divisor',
            description: 'The number by which to divide.',
            required: true,
            type: Instruction_1.DataType.NUMBER,
            spread: false
        }
    ],
    output: Instruction_1.DataType.NUMBER,
    run: (runtime) => {
        const [dividend, divisor] = runtime.getCompiledArgs().map(n => parseInt(n));
        const quotient = dividend / divisor;
        if (isNaN(quotient))
            return Output_1.Output.ok('NaN');
        return Output_1.Output.ok(quotient.toString());
    }
});
