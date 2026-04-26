"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$multi',
    description: 'Calculates the product of two numbers.',
    interpret: true,
    args: [
        {
            name: 'Factor 1',
            description: 'The first number to multiply.',
            required: true,
            type: Instruction_1.DataType.NUMBER,
            spread: false
        },
        {
            name: 'Factor 2',
            description: 'The second number to multiply.',
            required: true,
            type: Instruction_1.DataType.NUMBER,
            spread: false
        }
    ],
    output: Instruction_1.DataType.NUMBER,
    run: (runtime) => {
        const [factor1, factor2] = runtime.getCompiledArgs().map(n => parseInt(n));
        const product = factor1 * factor2;
        if (isNaN(product))
            return Output_1.Output.ok('NaN');
        return Output_1.Output.ok(product.toString());
    }
});
