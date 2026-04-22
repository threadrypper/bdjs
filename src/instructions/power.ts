import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$power',
    description: 'Calculates the power of a number.',
    interpret: true,
    args: [
        {
            name: 'Base',
            description: 'The number to be raised to a power.',
            required: true,
            type: DataType.NUMBER,
            spread: false
        },
        {
            name: 'Exponent',
            description: 'The power to which to raise the base.',
            required: true,
            type: DataType.NUMBER,
            spread: false
        }
    ],
    output: DataType.NUMBER,
    run: (runtime) => {
        const [base, exponent] = runtime.getCompiledArgs().map(n => parseInt(n))
        const power = Math.pow(base, exponent)

        if (isNaN(power)) return Output.ok('NaN')
        return Output.ok(power.toString())
    }
})
