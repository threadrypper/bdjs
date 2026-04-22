import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$cbrt',
    description: 'Returns the cube root of a number.',
    interpret: true,
    args: [
        {
            name: 'Number',
            description: 'The number to be cube rooted.',
            required: true,
            type: DataType.NUMBER,
            spread: false
        }
    ],
    output: DataType.NUMBER,
    run: (runtime) => {
        const [number] = runtime.getCompiledArgs().map(n => parseFloat(n))
        const cbrt = Math.cbrt(number)

        if (isNaN(cbrt)) return Output.ok('NaN')
        return Output.ok(cbrt.toString())
    }
})
