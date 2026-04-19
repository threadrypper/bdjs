import { CompiledData } from '@core/Reader'
import { FunctionField, RawFunction } from '@core/Structures'
import { IBDJSInstruction } from './Instruction'
import type { DiscordClient } from '@structures/DiscordClient'
import { InstructionManager } from '@managers/InstructionManager'

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
     * The discord client.
     */
    client!: DiscordClient

    /**
     * The self argument for the instruction.
     */
    self: InstructionSelfArg = {} as InstructionSelfArg

    /**
     * The instruction manager.
     */
    instructions = new InstructionManager()

    /**
     * The interpreted code.
     */
    #code!: string

    /**
     * The compiled data.
     */
    #compiled!: CompiledData

    /**
     * Whether the runtime must stop its execution.
     */
    #mustStop = false

    /**
     * Environment variables.
     * NOT ACCESIBLE USING `$get`.
     */
    #__internal__ = new Map<string, unknown>()

    /**
     * Gets the compiled arguments of the instruction.
     * @param callback The callback to apply to each argument.
     * @returns {Array<string | FunctionField>} The compiled arguments.
     */
    getCompiledArgs(callback: (arg: FunctionField) => string | FunctionField = (arg) => arg.value) {
        return this.self.raw.fields.map(callback)
    }

    /**
     * Set the result string of the interpretation phase.
     * @param result The result string.
     */
    setResultString(result: string) {
        this.#code = result
    }

    /**
     * Gets the result string.
     * @returns {string}
     */
    getResultString() {
        return this.#code
    }

    /**
     * Set the compiled data of the interpretation phase.
     * @param compiledData The compiled data.
     */
    setCompiledData(compiledData: CompiledData) {
        this.#compiled = compiledData
    }

    /**
     * Gets the compiled data.
     * @returns {CompiledData}
     */
    getCompiledData() {
        return this.#compiled
    }

    /**
     * Sets an environment variable.
     * NOT ACCESIBLE USING `$let`.
     * @param {string} name The name of the environment variable.
     * @param {unknown} value The value of the environment variable.
     */
    setEnvironmentVariable(name: string, value: unknown) {
        this.#__internal__.set(name, value)
    }

    /**
     * Gets an environment variable.
     * NOT ACCESIBLE USING `$get`.
     * @param {string} name The name of the environment variable.
     * @returns {unknown}
     */
    getEnvironmentVariable(name: string) {
        return this.#__internal__.get(name)
    }

    /**
     * Makes the runtime stop its execution.
     * @param state Whether the runtime must stop.
     */
    makeStop(state = true) {
        this.#mustStop = state
    }

    /**
     * Gets whether the runtime must stop its execution.
     * @returns {boolean}
     */
    get mustStop() {
        return this.#mustStop
    }
}