import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$sum',
    description: 'Calculates the sum of a list of two numbers.',
    interpret: true,
    args: [
        {
            name: 'Number 1',
            description: 'The first number to sum.',
            required: true,
            type: DataType.NUMBER,
            spread: false
        },
        {
            name: 'Number 2',
            description: 'The second number to sum.',
            required: true,
            type: DataType.NUMBER,
            spread: false
        }
    ],
    output: DataType.NUMBER,
    run: (runtime) => {
        const [number1, number2] = runtime.getCompiledArgs().map(n => parseInt(n))
        const sum = number1 + number2

        if (isNaN(sum)) return Output.ok('NaN')
        return Output.ok(sum.toString())
    }
})
