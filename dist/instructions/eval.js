"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
const Reader_1 = require("../core/Reader");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$eval',
    description: 'Executes BDJS code.',
    interpret: false,
    args: [
        {
            name: 'Code',
            description: 'BDJS code to execute',
            required: true,
            type: Instruction_1.DataType.ANY,
            spread: false
        }
    ],
    run: async (runtime) => {
        const [code] = runtime.getCompiledArgs();
        const runtimeResult = await Reader_1.Interpreter.parseAndRun(code, runtime);
        const resultString = runtimeResult.getResultString().trim();
        if (resultString === '') {
            return Output_1.Output.okButEmpty();
        }
        return Output_1.Output.ok(resultString);
    }
});
