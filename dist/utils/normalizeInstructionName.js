"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeInstructionName = void 0;
/**
 * Normalizes an instruction name.
 * @param name The instruction name.
 * @returns The normalized instruction name.
 */
const normalizeInstructionName = (name) => name.slice(1).toLowerCase();
exports.normalizeInstructionName = normalizeInstructionName;
