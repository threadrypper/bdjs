"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$trunc',
    description: 'Truncates a number to its integer part.',
    interpret: true,
    args: [
        {
            name: 'Number',
            description: 'The number to be truncated.',
            required: true,
            type: Instruction_1.DataType.NUMBER,
            spread: false
        }
    ],
    output: Instruction_1.DataType.NUMBER,
    run: (runtime) => {
        const [number] = runtime.getCompiledArgs().map(n => parseFloat(n));
        const truncated = Math.trunc(number);
        if (isNaN(truncated))
            return Output_1.Output.ok('NaN');
        return Output_1.Output.ok(truncated.toString());
    }
});
