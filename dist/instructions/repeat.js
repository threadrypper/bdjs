"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$repeat',
    description: 'Repeats a string a specified number of times.',
    interpret: true,
    args: [
        {
            name: 'String',
            description: 'The string to repeat.',
            required: true,
            type: Instruction_1.DataType.ANY,
            spread: false
        },
        {
            name: 'Count',
            description: 'The number of times to repeat the string.',
            required: true,
            type: Instruction_1.DataType.NUMBER,
            spread: false
        }
    ],
    run: (runtime) => {
        const [text, count] = runtime.getCompiledArgs();
        return Output_1.Output.ok(text.repeat(parseInt(count)));
    }
});
