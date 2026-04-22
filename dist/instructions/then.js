"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
const Reader_1 = require("../core/Reader");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$then',
    description: 'Executes a code block if a signal is true.\nReturns the result of the code block.',
    interpret: false,
    brackets: true,
    args: [
        {
            name: 'Signal',
            description: 'The signal to be received.',
            required: true,
            type: Instruction_1.DataType.BOOLEAN,
            spread: false
        },
        {
            name: 'Code',
            description: 'The code to execute if the signal is true.',
            required: true,
            type: Instruction_1.DataType.ANY,
            spread: false
        }
    ],
    run: async (runtime) => {
        const [signal, codeToExecute] = runtime.getRawArgs();
        const interpretedSignal = await Reader_1.Interpreter.parseAndRun(signal, runtime);
        if (interpretedSignal.getResultString() !== 'true') {
            return Output_1.Output.okButEmpty();
        }
        const result = await Reader_1.Interpreter.parseAndRun(codeToExecute, runtime);
        return Output_1.Output.ok(result.getResultString());
    }
});
