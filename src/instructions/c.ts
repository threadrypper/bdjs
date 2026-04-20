import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$c',
    description: 'Represents a BDJS comment.',
    interpret: false,
    args: [
        {
            name: 'Comment',
            description: 'The comment to display.',
            required: true,
            type: DataType.ANY,
            spread: false
        }
    ],
    run: () => Output.okButEmpty()
})
