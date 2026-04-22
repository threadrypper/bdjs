import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$multi',
    description: 'Calculates the product of two numbers.',
    interpret: true,
    args: [
        {
            name: 'Factor 1',
            description: 'The first number to multiply.',
            required: true,
            type: DataType.NUMBER,
            spread: false
        },
        {
            name: 'Factor 2',
            description: 'The second number to multiply.',
            required: true,
            type: DataType.NUMBER,
            spread: false
        }
    ],
    output: DataType.NUMBER,
    run: (runtime) => {
        const [factor1, factor2] = runtime.getCompiledArgs().map(n => parseInt(n))
        const product = factor1 * factor2

        if (isNaN(product)) return Output.ok('NaN')
        return Output.ok(product.toString())
    }
})
