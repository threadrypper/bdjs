"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const getVersion_1 = require("../utils/getVersion");
const Output_1 = require("../classes/internal/Output");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$version',
    description: 'Returns the version of the library.',
    interpret: false,
    run: () => Output_1.Output.ok((0, getVersion_1.getVersion)())
});
