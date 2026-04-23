import { createInstruction } from '@utils/createInstruction'
import { DataType } from '@internal/Instruction'
import { Output } from '@internal/Output'
import { Interpreter } from '@core/Reader'

export const data = createInstruction({
    name: '$loop',
    description: 'Loops a specified number of times.',
    interpret: false,
    args: [
        {
            name: 'Times',
            description: 'The number of times to loop.',
            required: true,
            type: DataType.NUMBER,
            spread: false
        },
        {
            name: 'Array Name',
            description: 'The name of the array to store the result of each iteration.',
            required: false,
            type: DataType.ANY,
            spread: false
        },
        {
            name: 'Index Name',
            description: 'The name of the variable to store the current index of the loop.',
            required: false,
            type: DataType.ANY,
            spread: false
        },
        {
            name: 'Code',
            description: 'The code to execute in each iteration.',
            required: true,
            type: DataType.ANY,
            spread: false
        }
    ],
    run: async (runtime) => {
        let [amount, arrayName, indexName, codeToExecute] = runtime.getRawArgs()
        
        const fixedAmount = parseInt(amount)
        const results: string[] = []
        arrayName = (await Interpreter.parseAndRun(arrayName, runtime)).getResultString()
        indexName = (await Interpreter.parseAndRun(indexName, runtime)).getResultString()

        for (let i = 0; i < fixedAmount; i++) {
            runtime.setEnvironmentVariable(indexName, i.toString())
            const result = await Interpreter.parseAndRun(codeToExecute, runtime)
            if (result.getResultString() === '') continue;
            results.push(result.getResultString())
        }

        runtime.setEnvironmentVariable(arrayName, results)

        return Output.okButEmpty()
    }
})
