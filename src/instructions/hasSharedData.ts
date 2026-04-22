import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'
import { Runtime } from '@internal/Runtime'

export const data = createInstruction({
    name: '$hasSharedData',
    description: 'Checks if a shared data value exists.',
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
        return Output.ok(String(Runtime.sharedData.has(key)))
    }
})
