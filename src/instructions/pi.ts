import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$pi',
    description: 'Returns the value of π (pi).',
    interpret: false,
    output: DataType.NUMBER,
    run: () => Output.ok(Math.PI.toString())
})
