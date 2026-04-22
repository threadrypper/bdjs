import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$sub',
    description: 'Calculates the difference between two numbers.',
    interpret: true,
    args: [
        {
            name: 'Minuend',
            description: 'The number from which another number is to be subtracted.',
            required: true,
            type: DataType.NUMBER,
            spread: false
        },
        {
            name: 'Subtrahend',
            description: 'The number to be subtracted.',
            required: true,
            type: DataType.NUMBER,
            spread: false
        }
    ],
    output: DataType.NUMBER,
    run: (runtime) => {
        const [minuend, subtrahend] = runtime.getCompiledArgs().map(n => parseInt(n))
        const difference = minuend - subtrahend

        if (isNaN(difference)) return Output.ok('NaN')
        return Output.ok(difference.toString())
    }
})
