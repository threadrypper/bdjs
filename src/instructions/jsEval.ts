import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$jsEval',
    description: 'Executes JavaScript code.',
    interpret: true,
    args: [
        {
            name: 'Code',
            description: 'JS code to execute',
            required: true,
            type: DataType.ANY,
            spread: false
        }
    ],
    run: async (runtime) => {
        const [code] = runtime.getCompiledArgs()

        try {
            const context = {
                runtime,
                console,
                Math,
                Date
            }

            const fn = new Function(
                ...Object.keys(context),
                `
                return (async () => {
                    ${code}
                })()
                `
            )

            const result = await fn(...Object.values(context))
            return Output.ok(result ?? '')
        } catch (err) {
            return Output.error(`Error: ${(err as Error).message}`)
        }
    }
})
