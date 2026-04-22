import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$mod',
    description: 'Calculates the remainder of two numbers.',
    interpret: true,
    args: [
        {
            name: 'Dividend',
            description: 'The number to be divided.',
            required: true,
            type: DataType.NUMBER,
            spread: false
        },
        {
            name: 'Divisor',
            description: 'The number by which to divide.',
            required: true,
            type: DataType.NUMBER,
            spread: false
        }
    ],
    output: DataType.NUMBER,
    run: (runtime) => {
        const [dividend, divisor] = runtime.getCompiledArgs().map(n => parseInt(n))
        const remainder = dividend % divisor

        if (isNaN(remainder)) return Output.ok('NaN')
        return Output.ok(remainder.toString())
    }
})
