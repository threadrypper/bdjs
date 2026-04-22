"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$randomNumber',
    description: 'Generates a random number.',
    interpret: true,
    args: [
        {
            name: 'Minimum',
            description: 'The minimum number.',
            required: true,
            type: Instruction_1.DataType.NUMBER,
            spread: false
        },
        {
            name: 'Maximum',
            description: 'The maximum number.',
            required: true,
            type: Instruction_1.DataType.NUMBER,
            spread: false
        }
    ],
    run: (runtime) => {
        const [min, max] = runtime.getCompiledArgs().map((value) => parseInt(value));
        return Output_1.Output.ok((Math.floor(Math.random() * (max - min + 1) + min)).toString());
    }
});
