"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$charCount',
    description: 'Returns the number of characters in a string.',
    interpret: true,
    args: [
        {
            name: 'String',
            description: 'The string to count the characters of.',
            required: true,
            type: Instruction_1.DataType.ANY,
            spread: false
        }
    ],
    run: (runtime) => {
        const [text] = runtime.getCompiledArgs();
        return Output_1.Output.ok(text.length.toString());
    }
});
