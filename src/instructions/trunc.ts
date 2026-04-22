import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$trunc',
    description: 'Truncates a number to its integer part.',
    interpret: true,
    args: [
        {
            name: 'Number',
            description: 'The number to be truncated.',
            required: true,
            type: DataType.NUMBER,
            spread: false
        }
    ],
    output: DataType.NUMBER,
    run: (runtime) => {
        const [number] = runtime.getCompiledArgs().map(n => parseFloat(n))
        const truncated = Math.trunc(number)

        if (isNaN(truncated)) return Output.ok('NaN')
        return Output.ok(truncated.toString())
    }
})
