"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
const Runtime_1 = require("../classes/internal/Runtime");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$setSharedData',
    description: 'Sets a shared data value.',
    interpret: true,
    args: [
        {
            name: 'Key',
            description: 'The key for the shared data.',
            required: true,
            type: Instruction_1.DataType.ANY,
            spread: false
        },
        {
            name: 'Value',
            description: 'The value for the shared data.',
            required: true,
            type: Instruction_1.DataType.ANY,
            spread: false
        }
    ],
    run: (runtime) => {
        const [key, value] = runtime.getCompiledArgs();
        Runtime_1.Runtime.sharedData.set(key, value);
        return Output_1.Output.okButEmpty();
    }
});
