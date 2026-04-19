import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'
import { Interpreter } from '@core/Reader'
import { globalCases } from './switch'

export const data = createInstruction({
    name: '$case',
    description: 'Executes a block of code if the condition is met.',
    interpret: false,
    brackets: true,
    args: [
        {
            name: 'Name',
            description: 'The name of the case.',
            required: true,
            type: DataType.ANY,
            spread: false
        },
        {
            name: 'Code',
            description: 'The code to execute if the condition is met.',
            required: true,
            type: DataType.ANY,
            spread: false
        }
    ],
    builder: true,
    builderOptions: {
        allowFor: '$switch'
    },
    run: async (runtime) => {
        let [name, codeToExecute] = runtime.getRawArgs()

        const interpretedName = await Interpreter.parseAndRun(name, runtime)
        name = interpretedName.getResultString()

        globalCases.set(name, codeToExecute)

        return Output.empty()
    }
})
