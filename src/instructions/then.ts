import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'
import { Interpreter } from '@core/Reader'

export const data = createInstruction({
    name: '$then',
    description: 'Executes a code block if a signal is true.\nReturns the result of the code block.',
    interpret: false,
    brackets: true,
    args: [
        {
            name: 'Signal',
            description: 'The signal to be received.',
            required: true,
            type: DataType.BOOLEAN,
            spread: false
        },
        {
            name: 'Code',
            description: 'The code to execute if the signal is true.',
            required: true,
            type: DataType.ANY,
            spread: false
        }
    ],
    run: async (runtime) => {
        const [signal, codeToExecute] = runtime.getRawArgs()

        const interpretedSignal = await Interpreter.parseAndRun(signal, runtime)
        if (interpretedSignal.getResultString() !== 'true') {
            return Output.okButEmpty()
        }

        const result = await Interpreter.parseAndRun(codeToExecute, runtime)
        return Output.ok(result.getResultString())
    }
})
