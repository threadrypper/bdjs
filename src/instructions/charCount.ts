import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$charCount',
    description: 'Returns the number of characters in a string.',
    interpret: true,
    args: [
        {
            name: 'String',
            description: 'The string to count the characters of.',
            required: true,
            type: DataType.ANY,
            spread: false
        }
    ],
    run: (runtime) => {
        const [text] = runtime.getCompiledArgs()
        return Output.ok(text.length.toString())
    }
})
