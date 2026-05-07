"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandManager = void 0;
const recursiveReaddir_1 = require("../utils/recursiveReaddir");
/**
 * Manages all application commands and global commands.
 */
class CommandManager {
    /**
     * Creates a new command manager.
     */
    constructor() {
        this.cache = new Map();
    }
    add(command) {
        this.cache.set(command.names?.[0] || `${command.type}:${this.cache.size + 1}`, command.code);
    }
    /**
     * Gets a command by its name.
     * @param {string} name The name of the command.
     * @returns {string | undefined} The code of the command.
     */
    get(name) {
        let command = this.cache.get(name);
        if (!command) {
            const allCommands = Array.from(this.cache.values());
            command = allCommands.find((cmd) => cmd.includes(name));
        }
        return command;
    }
    /**
     * Loads commands from a directory.
     * @param {string} dir The directory to load commands from.
     */
    load(dir) {
        const files = (0, recursiveReaddir_1.recursiveReaddir)(dir, f => f.endsWith('.js'));
        files.forEach((file) => {
            const command = require(file).data;
            this.add(command);
        });
    }
}
exports.CommandManager = CommandManager;
