import { CompiledData } from '@core/Reader'
import { FunctionField, RawFunction } from '@core/Structures'
import { IBDJSInstruction } from './Instruction'
import type { DiscordClient } from '@structures/DiscordClient'
import { InstructionManager } from '@managers/InstructionManager'
import { IllegalGetterError } from './Errors'

interface InstructionSelfArg {
    /**
     * The instruction data.
     */
    data: IBDJSInstruction
    /**
     * The raw function compiled by the reader.
     */
    raw: RawFunction
    /**
     * The unwrapped arguments of the instruction.
     */
    unwrapped: string[]
}

export class Runtime {
    /**
     * The discord client.
     */
    client!: DiscordClient

    /**
     * The self argument for the instruction.
     */
    self: InstructionSelfArg = {
        unwrapped: [],
        raw: {} as RawFunction,
        data: {} as IBDJSInstruction
    }

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
     * The name of the runtime.
     */
    #__name__ = 'global'

    /**
     * Creates a new runtime.
     * @param runtimeName The name of the runtime.
     * @param options Options for the runtime.
     */
    constructor(runtimeName?: string, options?: Partial<Runtime>) {
        if (runtimeName) this.#__name__ = runtimeName
        if (options) {
            Object.assign(this, options)
            this.instructions = new InstructionManager(options.instructions?.entries())
        }

        // Set the name of the instruction manager.
        this.instructions.name = this.#__name__
    }

    /**
     * Gets the compiled arguments of the instruction.
     * @returns {Array<string>} The compiled arguments.
     */
    getCompiledArgs() {
        // Cannot get "compiled args" through this method.
        if (!this.self.data.interpret) {
            throw new IllegalGetterError('Cannot get compiled arguments of an not-interpreted instruction.')
        }

        return this.self.unwrapped
    }

    /**
     * Gets the raw arguments of the instruction.
     * @returns {Array<string>} The raw arguments.
     */
    getRawArgs() {
        return this.self.raw.fields.map((field) => field.value)
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
    setEnvironmentVariable(name: string, value: unknown): void
    /**
     * Inherit internal variables from a parent runtime.
     * @param entries 
     */
    setEnvironmentVariable(entries: MapIterator<[string, unknown]>): void
    setEnvironmentVariable(name: string | MapIterator<[string, unknown]>, value?: unknown) {
        if (typeof name === 'string') {
            this.#__internal__.set(name, value!)
        } else {
            for (const [key, value] of name) {
                this.#__internal__.set(key, value)
            }
        }
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

    /**
     * Gets the name of the runtime.
     * @returns {string}
     */
    get name() {
        return this.#__name__
    }
}