"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$cbrt',
    description: 'Returns the cube root of a number.',
    interpret: true,
    args: [
        {
            name: 'Number',
            description: 'The number to be cube rooted.',
            required: true,
            type: Instruction_1.DataType.NUMBER,
            spread: false
        }
    ],
    output: Instruction_1.DataType.NUMBER,
    run: (runtime) => {
        const [number] = runtime.getCompiledArgs().map(n => parseFloat(n));
        const cbrt = Math.cbrt(number);
        if (isNaN(cbrt))
            return Output_1.Output.ok('NaN');
        return Output_1.Output.ok(cbrt.toString());
    }
});
