import { recursiveReaddir } from "@utils/recursiveReaddir"

/**
 * Manages all application commands and global commands.
 */
export class CommandManager<CommandType extends string> {
    cache = new Map<string, string>()
    /**
     * Creates a new command manager.
     */
    constructor() { }
    add(command: BaseCommand<CommandType>) {
        this.cache.set(command.names?.[0] || `${command.type}:${this.cache.size + 1}`, command.code)
    }

    /**
     * Gets a command by its name.
     * @param {string} name The name of the command.
     * @returns {string | undefined} The code of the command.
     */
    get(name: string) {
        let command = this.cache.get(name)
        if (!command) {
            const allCommands = Array.from(this.cache.values())
            command = allCommands.find((cmd) => cmd.includes(name))
        }

        return command
    }

    /**
     * Loads commands from a directory.
     * @param {string} dir The directory to load commands from.
     */
    load(dir: string) {
        const files = recursiveReaddir(dir, f => f.endsWith('.js'))
        files.forEach((file) => {
            const command = require(file).data
            this.add(command)
        })
    }
}

export interface BaseCommand<T> {
    /**
     * The type of the command.
     */
    type: T
    /**
     * The name(s) of the command.
     */
    names?: string[]
    /**
     * The description of the command.
     */
    description?: string
    /**
     * The code to run when the command is triggered.
     */
    code: string
}