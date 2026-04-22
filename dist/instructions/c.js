"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$c',
    description: 'Represents a BDJS comment.',
    interpret: false,
    args: [
        {
            name: 'Comment',
            description: 'The comment to display.',
            required: true,
            type: Instruction_1.DataType.ANY,
            spread: false
        }
    ],
    run: () => Output_1.Output.okButEmpty()
});
