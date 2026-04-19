import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$lowercase',
    description: 'Converts a string to lowercase.',
    interpret: true,
    args: [
        {
            name: 'String',
            description: 'The string to convert to lowercase.',
            required: true,
            type: DataType.ANY,
            spread: false
        }
    ],
    run: (runtime) => {
        const [text] = runtime.getCompiledArgs()
        return Output.ok(text.toLowerCase())
    }
})
