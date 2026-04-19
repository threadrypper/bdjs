"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const tslib_1 = require("tslib");
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
const math_expression_evaluator_1 = tslib_1.__importDefault(require("math-expression-evaluator"));
const math = new math_expression_evaluator_1.default();
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$calculate',
    description: 'Calculates a mathematical expression.',
    interpret: true,
    args: [
        {
            name: 'Expression',
            description: 'The expression to calculate.',
            required: true,
            type: Instruction_1.DataType.ANY,
            spread: false
        }
    ],
    run: (runtime) => {
        const [expression] = runtime.getCompiledArgs();
        const result = math.eval(expression);
        return Output_1.Output.ok(result.toString());
    }
});
