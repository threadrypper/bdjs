import { createInstruction } from '../utils/createInstruction'

export const data = createInstruction({
    name: '$cat',
    description: 'Meows like a cat.',
    interpret: false,
    run: (runtime) => {
        console.log('Meow!')
    }
})
