import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$randomNumber',
    description: 'Generates a random number.',
    interpret: true,
    args: [
        {
            name: 'Minimum',
            description: 'The minimum number.',
            required: true,
            type: DataType.NUMBER,
            spread: false
        },
        {
            name: 'Maximum',
            description: 'The maximum number.',
            required: true,
            type: DataType.NUMBER,
            spread: false
        }
    ],
    run: (runtime) => {
        const [min, max] = runtime.getCompiledArgs().map((value) => parseInt(value))
        return Output.ok((Math.floor(Math.random() * (max - min + 1) + min)).toString())
    }
})
