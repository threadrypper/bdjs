"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$endsWith',
    description: 'Checks if a string ends with a specified suffix.',
    interpret: true,
    args: [
        {
            name: 'String',
            description: 'The string to check.',
            required: true,
            type: Instruction_1.DataType.ANY,
            spread: false
        },
        {
            name: 'Suffix',
            description: 'The suffix to check for.',
            required: true,
            type: Instruction_1.DataType.ANY,
            spread: false
        }
    ],
    run: (runtime) => {
        const [text, suffix] = runtime.getCompiledArgs();
        return Output_1.Output.ok(String(text.endsWith(suffix)));
    }
});
