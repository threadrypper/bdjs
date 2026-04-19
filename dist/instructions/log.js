"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$log',
    description: 'Logs a message.',
    interpret: true,
    args: [
        {
            name: 'Message',
            description: 'The message to log.',
            required: true,
            type: Instruction_1.DataType.ANY,
            spread: false
        }
    ],
    run: (runtime) => {
        const message = runtime.getCompiledArgs();
        console.log(...message);
        return Output_1.Output.empty();
    }
});
