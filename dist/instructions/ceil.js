"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$ceil',
    description: 'Rounds a number up to the nearest integer.',
    interpret: true,
    args: [
        {
            name: 'Number',
            description: 'The number to be rounded.',
            required: true,
            type: Instruction_1.DataType.NUMBER,
            spread: false
        }
    ],
    output: Instruction_1.DataType.NUMBER,
    run: (runtime) => {
        const [number] = runtime.getCompiledArgs().map(n => parseFloat(n));
        const rounded = Math.ceil(number);
        if (isNaN(rounded))
            return Output_1.Output.ok('NaN');
        return Output_1.Output.ok(rounded.toString());
    }
});
