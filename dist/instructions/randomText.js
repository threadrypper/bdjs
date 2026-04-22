"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$randomText',
    description: 'Generates a random text.',
    interpret: true,
    args: [
        {
            name: 'Values',
            description: 'The values to generate a random text from.',
            required: true,
            type: Instruction_1.DataType.ANY,
            spread: true
        }
    ],
    run: (runtime) => {
        const values = runtime.getCompiledArgs();
        return Output_1.Output.ok(values[Math.floor(Math.random() * values.length)]);
    }
});
