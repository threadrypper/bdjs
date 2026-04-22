"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Output_1 = require("../classes/internal/Output");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$stop',
    description: 'Stops the execution of the code.',
    interpret: false,
    run: () => Output_1.Output.stop()
});
