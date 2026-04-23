import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$arrayJoin',
    description: 'Joins the elements of an array into a string.',
    interpret: true,
    args: [
        {
            name: 'Array',
            description: 'The array to join.',
            required: true,
            type: DataType.ARRAY,
            spread: false
        },
        {
            name: 'Separator',
            description: 'The separator to use between elements.',
            required: false,
            type: DataType.ANY,
            spread: false
        }
    ],
    run: (runtime) => {
        const [array, separator] = runtime.getCompiledArgs()
        const arrayValue = runtime.getEnvironmentVariable(array) as string[]

        return Output.ok(arrayValue.join(separator || ', '))
    }
})
