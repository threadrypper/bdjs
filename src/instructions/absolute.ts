import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$absolute',
    description: 'Returns the absolute value of a number.',
    interpret: true,
    args: [
        {
            name: 'Number',
            description: 'The number to be converted to its absolute value.',
            required: true,
            type: DataType.NUMBER,
            spread: false
        }
    ],
    output: DataType.NUMBER,
    run: (runtime) => {
        const [number] = runtime.getCompiledArgs().map(n => parseFloat(n))
        const absolute = Math.abs(number)

        if (isNaN(absolute)) return Output.ok('NaN')
        return Output.ok(absolute.toString())
    }
})
