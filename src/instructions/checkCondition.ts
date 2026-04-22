import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'
import { ConditionParser } from '@core/ConditionParser'

export const data = createInstruction({
    name: '$checkCondition',
    description: 'Checks if a condition is true.\nReturns true if the condition is true, false otherwise.',
    interpret: true,
    brackets: true,
    args: [
        {
            name: 'Condition',
            description: 'The condition to check.',
            required: true,
            type: DataType.ANY,
            spread: false
        }
    ],
    run: (runtime) => {
        const [condition] = runtime.getCompiledArgs()

        const tokens = ConditionParser.tokenize(condition)
        const ast = ConditionParser.parse(tokens)
        const result = ConditionParser.evaluate(ast)

        return Output.ok(String(result))
    }
})
