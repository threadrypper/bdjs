import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$round',
    description: 'Rounds a number to the nearest integer.',
    interpret: true,
    args: [
        {
            name: 'Number',
            description: 'The number to be rounded.',
            required: true,
            type: DataType.NUMBER,
            spread: false
        }
    ],
    output: DataType.NUMBER,
    run: (runtime) => {
        const [number] = runtime.getCompiledArgs().map(n => parseFloat(n))
        const rounded = Math.round(number)

        if (isNaN(rounded)) return Output.ok('NaN')
        return Output.ok(rounded.toString())
    }
})
