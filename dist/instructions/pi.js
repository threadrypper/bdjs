"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$pi',
    description: 'Returns the value of π (pi).',
    interpret: false,
    output: Instruction_1.DataType.NUMBER,
    run: () => Output_1.Output.ok(Math.PI.toString())
});
