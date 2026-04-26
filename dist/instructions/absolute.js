"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$absolute',
    description: 'Returns the absolute value of a number.',
    interpret: true,
    args: [
        {
            name: 'Number',
            description: 'The number to be converted to its absolute value.',
            required: true,
            type: Instruction_1.DataType.NUMBER,
            spread: false
        }
    ],
    output: Instruction_1.DataType.NUMBER,
    run: (runtime) => {
        const [number] = runtime.getCompiledArgs().map(n => parseFloat(n));
        const absolute = Math.abs(number);
        if (isNaN(absolute))
            return Output_1.Output.ok('NaN');
        return Output_1.Output.ok(absolute.toString());
    }
});
