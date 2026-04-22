"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
const ConditionParser_1 = require("../core/ConditionParser");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$checkCondition',
    description: 'Checks if a condition is true.\nReturns true if the condition is true, false otherwise.',
    interpret: true,
    brackets: true,
    args: [
        {
            name: 'Condition',
            description: 'The condition to check.',
            required: true,
            type: Instruction_1.DataType.ANY,
            spread: false
        }
    ],
    run: (runtime) => {
        const [condition] = runtime.getCompiledArgs();
        const tokens = ConditionParser_1.ConditionParser.tokenize(condition);
        const ast = ConditionParser_1.ConditionParser.parse(tokens);
        const result = ConditionParser_1.ConditionParser.evaluate(ast);
        return Output_1.Output.ok(String(result));
    }
});
