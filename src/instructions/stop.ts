import { createInstruction } from '@utils/createInstruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$stop',
    description: 'Stops the execution of the code.',
    interpret: false,
    run: () => {
        return Output.stop()
    }
})
