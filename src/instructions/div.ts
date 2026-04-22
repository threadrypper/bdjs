import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$div',
    description: 'Calculates the quotient of two numbers.',
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
        const quotient = dividend / divisor

        if (isNaN(quotient)) return Output.ok('NaN')
        return Output.ok(quotient.toString())
    }
})
