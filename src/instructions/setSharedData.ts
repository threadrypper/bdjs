import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'
import { Runtime } from '@internal/Runtime'

export const data = createInstruction({
    name: '$setSharedData',
    description: 'Sets a shared data value.',
    interpret: true,
    args: [
        {
            name: 'Key',
            description: 'The key for the shared data.',
            required: true,
            type: DataType.ANY,
            spread: false
        },
        {
            name: 'Value',
            description: 'The value for the shared data.',
            required: true,
            type: DataType.ANY,
            spread: false
        }
    ],
    run: (runtime) => {
        const [key, value] = runtime.getCompiledArgs()
        Runtime.sharedData.set(key, value)
        return Output.okButEmpty()
    }
})
