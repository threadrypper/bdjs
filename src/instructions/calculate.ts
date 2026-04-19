import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'
import Mexp from 'math-expression-evaluator'

const math = new Mexp()

export const data = createInstruction({
    name: '$calculate',
    description: 'Calculates a mathematical expression.',
    interpret: true,
    args: [
        {
            name: 'Expression',
            description: 'The expression to calculate.',
            required: true,
            type: DataType.ANY,
            spread: false
        }
    ],
    run: (runtime) => {
        const [expression] = runtime.getCompiledArgs()
        const result = math.eval(expression)
        return Output.ok(result.toString())
    }
})
