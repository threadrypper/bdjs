import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$repeat',
    description: 'Repeats a string a specified number of times.',
    interpret: true,
    args: [
        {
            name: 'String',
            description: 'The string to repeat.',
            required: true,
            type: DataType.ANY,
            spread: false
        },
        {
            name: 'Count',
            description: 'The number of times to repeat the string.',
            required: true,
            type: DataType.NUMBER,
            spread: false
        }
    ],
    run: (runtime) => {
        const [text, count] = runtime.getCompiledArgs()
        return Output.ok(text.repeat(parseInt(count)))
    }
})
