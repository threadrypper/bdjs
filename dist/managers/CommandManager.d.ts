/**
 * Manages all application commands and global commands.
 */
export declare class CommandManager<CommandType extends string> {
    cache: Map<string, string>;
    /**
     * Creates a new command manager.
     */
    constructor();
    add(command: BaseCommand<CommandType>): void;
    /**
     * Gets a command by its name.
     * @param {string} name The name of the command.
     * @returns {string | undefined} The code of the command.
     */
    get(name: string): string | undefined;
    /**
     * Loads commands from a directory.
     * @param {string} dir The directory to load commands from.
     */
    load(dir: string): void;
}
export interface BaseCommand<T> {
    /**
     * The type of the command.
     */
    type: T;
    /**
     * The name(s) of the command.
     */
    names?: string[];
    /**
     * The description of the command.
     */
    description?: string;
    /**
     * The code to run when the command is triggered.
     */
    code: string;
}
