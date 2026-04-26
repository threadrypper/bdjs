"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$arrayJoin',
    description: 'Joins the elements of an array into a string.',
    interpret: true,
    args: [
        {
            name: 'Array',
            description: 'The array to join.',
            required: true,
            type: Instruction_1.DataType.ARRAY,
            spread: false
        },
        {
            name: 'Separator',
            description: 'The separator to use between elements.',
            required: false,
            type: Instruction_1.DataType.ANY,
            spread: false
        }
    ],
    run: (runtime) => {
        const [array, separator] = runtime.getCompiledArgs();
        const arrayValue = runtime.getEnvironmentVariable(array);
        return Output_1.Output.ok(arrayValue.join(separator || ', '));
    }
});
