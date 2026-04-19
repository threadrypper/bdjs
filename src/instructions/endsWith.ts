import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$endsWith',
    description: 'Checks if a string ends with a specified suffix.',
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
            name: 'Suffix',
            description: 'The suffix to check for.',
            required: true,
            type: DataType.ANY,
            spread: false
        }
    ],
    run: (runtime) => {
        const [text, suffix] = runtime.getCompiledArgs()
        return Output.ok(String(text.endsWith(suffix)))
    }
})
