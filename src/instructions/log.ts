import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$log',
    description: 'Logs a message.',
    interpret: true,
    args: [
        {
            name: 'Message',
            description: 'The message to log.',
            required: true,
            type: DataType.ANY,
            spread: false
        }
    ],
    run: (runtime) => {
        const message = runtime.getCompiledArgs()

        console.log(message)

        return Output.ok()
    }
})
