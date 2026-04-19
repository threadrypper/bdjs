import { createInstruction } from '@utils/createInstruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$cat',
    description: 'Meows like a cat.',
    interpret: false,
    run: (runtime) => {
        console.log('Meow!')
        return Output.ok()
    }
})
