import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'
import { Interpreter } from '@core/Reader'

export const data = createInstruction({
    name: '$eval',
    description: 'Executes BDJS code.',
    interpret: false,
    args: [
        {
            name: 'Code',
            description: 'BDJS code to execute',
            required: true,
            type: DataType.ANY,
            spread: false
        }
    ],
    run: async (runtime) => {
        const [code] = runtime.getCompiledArgs()

        const runtimeResult = await Interpreter.parseAndRun(code, runtime)
        const resultString = runtimeResult.getResultString().trim()

        if (resultString === '') {
            return Output.okButEmpty()
        }
        
        return Output.ok(resultString)
    }
})
