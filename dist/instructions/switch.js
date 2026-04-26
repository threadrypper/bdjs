"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = exports.globalCases = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
const Reader_1 = require("../core/Reader");
/**
 * Global cases for the switch instruction.
 */
exports.globalCases = new Map();
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$switch',
    description: 'Match a value against multiple cases.\nDoes not return any value.',
    interpret: false,
    brackets: true,
    args: [
        {
            name: 'Value',
            description: 'The value to check.',
            required: true,
            type: Instruction_1.DataType.ANY,
            spread: false
        },
        {
            name: 'Cases',
            description: 'The cases to check.',
            required: true,
            type: Instruction_1.DataType.ANY,
            spread: false
        }
    ],
    run: async (runtime) => {
        let [value, casesInside] = runtime.getRawArgs();
        exports.globalCases.clear(); // Clear cases from previous switch.
        const interpretedValue = await Reader_1.Interpreter.parseAndRun(value, runtime);
        value = interpretedValue.getResultString();
        runtime.instructions.enableCachedBuilders(e => e.builderOptions.allowFor('$switch'));
        await Reader_1.Interpreter.parseAndRun(casesInside, runtime);
        runtime.instructions.disableBuilders(e => e.builderOptions.allowFor('$switch'));
        if (!exports.globalCases.has(value)) {
            return Output_1.Output.okButEmpty();
        }
        const caseToExecute = exports.globalCases.get(value);
        await Reader_1.Interpreter.parseAndRun(caseToExecute, runtime);
        return Output_1.Output.okButEmpty();
    }
});
