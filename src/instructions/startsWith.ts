import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$startsWith',
    description: 'Checks if a string starts with a specified prefix.',
    interpret: true,
    args: [
        {
            name: 'String',
            description: 'The string to check.',
            required: true,
            type: DataType.ANY,
            spread: false
        },
        {
            name: 'Prefix',
            description: 'The prefix to check for.',
            required: true,
            type: DataType.ANY,
            spread: false
        }
    ],
    run: (runtime) => {
        const [text, prefix] = runtime.getCompiledArgs()
        return Output.ok(String(text.startsWith(prefix)))
    }
})
