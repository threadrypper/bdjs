import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$randomText',
    description: 'Generates a random text.',
    interpret: true,
    args: [
        {
            name: 'Values',
            description: 'The values to generate a random text from.',
            required: true,
            type: DataType.ANY,
            spread: true
        }
    ],
    run: (runtime) => {
        const values = runtime.getCompiledArgs()
        return Output.ok(values[Math.floor(Math.random() * values.length)])
    }
})
