"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = exports.allowed = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
const Reader_1 = require("../core/Reader");
const switch_1 = require("./switch");
/**
 * @internal
 * Instructions that can contain $case.
 */
exports.allowed = ['$switch'];
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$case',
    description: 'Executes a block of code if the condition is met.',
    interpret: false,
    brackets: true,
    args: [
        {
            name: 'Name',
            description: 'The name of the case.',
            required: true,
            type: Instruction_1.DataType.ANY,
            spread: false
        },
        {
            name: 'Code',
            description: 'The code to execute if the condition is met.',
            required: true,
            type: Instruction_1.DataType.ANY,
            spread: false
        }
    ],
    builder: true,
    builderOptions: {
        allowFor: (name) => exports.allowed.includes(name)
    },
    run: async (runtime) => {
        let [name, codeToExecute] = runtime.getRawArgs();
        const interpretedName = await Reader_1.Interpreter.parseAndRun(name, runtime);
        name = interpretedName.getResultString();
        switch_1.globalCases.set(name, codeToExecute);
        return Output_1.Output.okButEmpty();
    }
});
