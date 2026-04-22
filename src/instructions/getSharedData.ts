import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'
import { Runtime } from '@internal/Runtime'

export const data = createInstruction({
    name: '$getSharedData',
    description: 'Gets a shared data value.',
    interpret: true,
    args: [
        {
            name: 'Key',
            description: 'The key for the shared data.',
            required: true,
            type: DataType.ANY,
            spread: false
        }
    ],
    run: (runtime) => {
        const [key] = runtime.getCompiledArgs()
        const value = Runtime.sharedData.get(key)

        if (value === undefined) {
            return Output.okButEmpty()
        }

        return Output.ok(value as string)
    }
})
