import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$sqrt',
    description: 'Returns the square root of a number.',
    interpret: true,
    args: [
        {
            name: 'Number',
            description: 'The number to be square rooted.',
            required: true,
            type: DataType.NUMBER,
            spread: false
        }
    ],
    output: DataType.NUMBER,
    run: (runtime) => {
        const [number] = runtime.getCompiledArgs().map(n => parseFloat(n))
        const sqrt = Math.sqrt(number)

        if (isNaN(sqrt)) return Output.ok('NaN')
        return Output.ok(sqrt.toString())
    }
})
