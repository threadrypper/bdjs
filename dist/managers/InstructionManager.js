"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionManager = void 0;
const recursiveReaddir_1 = require("../utils/recursiveReaddir");
/**
 * Checks if an instruction should be loaded.
 * @param {IBDJSInstruction} instruction The instruction to check.
 * @returns {boolean} True if the instruction should be loaded, false otherwise.
 */
function shouldLoad(instruction) {
    return instruction.builder === undefined || instruction.builder === false;
}
/**
 * Manages instructions.
 */
class InstructionManager extends Map {
    /**
     * Loads instructions from a directory.
     * @param {string} directory The directory to load instructions from.
     */
    load(directory, filter = shouldLoad) {
        const files = (0, recursiveReaddir_1.recursiveReaddir)(directory);
        for (const file of files) {
            const instruction = require(file);
            if (filter(instruction)) {
                this.set(instruction.name, instruction);
            }
        }
    }
}
exports.InstructionManager = InstructionManager;
