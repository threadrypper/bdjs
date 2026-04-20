import { createInstruction } from '@utils/createInstruction'
import { DataType, IBDJSInstruction } from '@internal/Instruction'
import { Output } from '@internal/Output'
import { Interpreter } from '@core/Reader'
import { Runtime } from '@internal/Runtime'
import { INTERNAL_INSTRUCTIONS_DIRECTORY } from 'src/constants'

/**
 * Global cases for the switch instruction.
 */
export const globalCases = new Map<string, string>()

/**
 * Checks if an instruction should be loaded in the subruntime.
 * @param f The instruction to check.
 * @returns {boolean}
 */
function shouldLoadCase(f: IBDJSInstruction) {
    return f.builder === true && f.builderOptions?.allowFor === '$switch'
}

export const data = createInstruction({
    name: '$switch',
    description: 'Match a value against multiple cases.\nDoes not return any value.',
    interpret: false,
    brackets: true,
    args: [
        {
            name: 'Value',
            description: 'The value to check.',
            required: true,
            type: DataType.ANY,
            spread: false
        },
        {
            name: 'Cases',
            description: 'The cases to check.',
            required: true,
            type: DataType.ANY,
            spread: false
        }
    ],
    run: async (runtime) => {
        let [value, casesInside] = runtime.getRawArgs()
        globalCases.clear() // Clear cases from previous switch.

        const interpretedValue = await Interpreter.parseAndRun(value, runtime)
        value = interpretedValue.getResultString()

        runtime.instructions.enableCachedBuilders(shouldLoadCase)
        await Interpreter.parseAndRun(casesInside, runtime)
        runtime.instructions.disableBuilders(shouldLoadCase)

        if (!globalCases.has(value)) {
            return Output.okButEmpty()
        }

        const caseToExecute = globalCases.get(value)!
        await Interpreter.parseAndRun(caseToExecute, runtime)

        return Output.okButEmpty()
    }
})
