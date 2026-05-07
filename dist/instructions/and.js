"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const ConditionParser_1 = require("../core/ConditionParser");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$and',
    description: 'Returns true if all conditions are true.',
    interpret: true,
    args: [
        {
            name: 'Condition',
            description: 'The condition to be checked.',
            required: true,
            type: Instruction_1.DataType.BOOLEAN,
            spread: true
        }
    ],
    output: Instruction_1.DataType.BOOLEAN,
    run: (runtime) => {
        const rawConditions = runtime.getCompiledArgs();
        const conditionResults = rawConditions.map((value) => {
            const tokens = ConditionParser_1.ConditionParser.tokenize(value);
            const ast = ConditionParser_1.ConditionParser.parse(tokens);
            const result = ConditionParser_1.ConditionParser.evaluate(ast);
            return result;
        });
        const areAllTrue = conditionResults.every((condition) => condition === true);
        return Output_1.Output.ok(String(areAllTrue));
    }
});
