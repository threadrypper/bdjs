import type { Task } from '@core/Task'

/**
 * Base options for commands.
 */
export interface BaseCommandOptions<Type extends string = string> {
    /**
     * The name of the command.
     */
    name?: string
    /**
     * The type of the command.
     */
    type: Type
    /**
     * The code to be interpreted for the command.
     */
    code: string
    /**
     * The compiled task data for the command.
     */
    __compiled__?: Task[]
}

/**
 * Represents a command structure.
 */
export class Command<Type extends string = string> implements BaseCommandOptions<Type> {
    /**
     * The name of the command.
     */
    name: string

    /**
     * The type of the command.
     */
    type: Type

    /**
     * The code to be interpreted for the command.
     */
    code: string

    /**
     * The compiled task data for the command.
     */
    __compiled__?: Task[]

    /**
     * Creates an instance of the command structure.
     * @param options The base command options.
     */
    constructor(options: BaseCommandOptions<Type>) {
        this.name = options.name ?? ''
        this.type = options.type
        this.code = options.code
    }

    /**
     * Compiles the command's code into tasks.
     * @returns True if the compilation was successful, false otherwise.
     */
    compile() {
        this.__compiled__ = [] // Placeholder for actual compilation logic.
        return !!this.__compiled__ && this.__compiled__.length > 0
    }
}