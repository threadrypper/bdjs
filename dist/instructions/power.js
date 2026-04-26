"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$power',
    description: 'Calculates the power of a number.',
    interpret: true,
    args: [
        {
            name: 'Base',
            description: 'The number to be raised to a power.',
            required: true,
            type: Instruction_1.DataType.NUMBER,
            spread: false
        },
        {
            name: 'Exponent',
            description: 'The power to which to raise the base.',
            required: true,
            type: Instruction_1.DataType.NUMBER,
            spread: false
        }
    ],
    output: Instruction_1.DataType.NUMBER,
    run: (runtime) => {
        const [base, exponent] = runtime.getCompiledArgs().map(n => parseInt(n));
        const power = Math.pow(base, exponent);
        if (isNaN(power))
            return Output_1.Output.ok('NaN');
        return Output_1.Output.ok(power.toString());
    }
});
