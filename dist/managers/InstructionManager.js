"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionManager = void 0;
const normalizeInstructionName_1 = require("../utils/normalizeInstructionName");
const recursiveReaddir_1 = require("../utils/recursiveReaddir");
/**
 * Adds an instruction to a registry.
 * @param registry The registry to add the instruction to.
 * @param instruction The instruction to add.
 */
const addInstruction = (registry, instruction) => {
    registry.set((0, normalizeInstructionName_1.normalizeInstructionName)(instruction.name), instruction);
};
/**
 * Checks if an instruction is a builder.
 * @param instruction The instruction to check.
 * @returns {boolean}
 */
const isBuilder = (instruction) => {
    return typeof instruction === 'object' && instruction !== null && 'builder' in instruction && typeof instruction.builder === 'boolean' && instruction.builder === true;
};
/**
 * Manages instructions.
 */
class InstructionManager extends Map {
    constructor() {
        super(...arguments);
        /**
         * Registry for builder instructions.
         */
        this.builders = new Map();
        /**
         * The runtime name this manager is for.
         */
        this.name = 'global';
    }
    /**
     * Loads instructions from a directory.
     * @param {string} directory The directory to load instructions from.
     */
    load(directory) {
        const files = (0, recursiveReaddir_1.recursiveReaddir)(directory, f => f.endsWith('.js'));
        const loadedInstructions = files.map((directory) => require(directory).data);
        for (const instruction of loadedInstructions) {
            if (isBuilder(instruction)) {
                addInstruction(this.builders, instruction);
                continue;
            }
            addInstruction(this, instruction);
        }
    }
    /**
     * Enables cached builders.
     * @param filter Filter for the builders to enable.
     */
    enableCachedBuilders(filter = () => false) {
        for (const instruction of this.builders.values()) {
            if (filter(instruction)) {
                addInstruction(this, instruction);
            }
        }
    }
    /**
     * Disables builders.
     * @param filter Filter for the builders to disable.
     */
    disableBuilders(filter = () => false) {
        const addedBuilders = Array.from(this.values()).filter(isBuilder);
        const currentSize = this.size;
        for (const instruction of addedBuilders) {
            const instructionName = (0, normalizeInstructionName_1.normalizeInstructionName)(instruction.name);
            const shouldDelete = filter(instruction) && this.has(instructionName);
            if (shouldDelete) {
                this.delete(instructionName);
            }
        }
        return this.size < currentSize;
    }
}
exports.InstructionManager = InstructionManager;
