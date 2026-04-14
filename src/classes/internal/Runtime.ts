import { RawFunction } from '../../core/Structures'
import { IBDJSInstruction } from './Instruction'

interface InstructionSelfArg {
    /**
     * The instruction data.
     */
    data: IBDJSInstruction
    /**
     * The raw function compiled by the reader.
     */
    raw: RawFunction
}

export class Runtime {
    /**
     * The self argument for the instruction.
     */
    self!: InstructionSelfArg
    #__internal__ = new Map<string, unknown>()
    setEnvironmentVariable(name: string, value: unknown) {
        this.#__internal__.set(name, value)
    }
    getEnvironmentVariable(name: string) {
        return this.#__internal__.get(name)
    }
}