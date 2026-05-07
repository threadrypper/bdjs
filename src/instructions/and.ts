import { createInstruction } from '@utils/createInstruction'
import { ConditionParser } from '@core/ConditionParser'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$and',
    description: 'Returns true if all conditions are true.',
    interpret: true,
    args: [
        {
            name: 'Condition',
            description: 'The condition to be checked.',
            required: true,
            type: DataType.BOOLEAN,
            spread: true
        }
    ],
    output: DataType.BOOLEAN,
    run: (runtime) => {
        const rawConditions = runtime.getCompiledArgs()
        const conditionResults = rawConditions.map((value) => {
            const tokens = ConditionParser.tokenize(value)
            const ast = ConditionParser.parse(tokens)
            const result = ConditionParser.evaluate(ast)

            return result
        })

        const areAllTrue = conditionResults.every((condition) => condition === true)
        return Output.ok(String(areAllTrue))
    }
})
