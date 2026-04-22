import { IBDJSInstruction } from '../classes/internal/Instruction';
export declare namespace MarkdownGenerator {
    /**
     * Generates markdown documentation for all instructions.
     * @param {string} outputDir The directory to save the markdown files to.
     * @returns {Promise<void>}
     */
    function generateAll(outputDir?: string): void;
    /**
     * Generates a JSON file with the internal instructions.
     * @param {string} outputDir The directory to save the JSON file to.
     * @returns {Promise<void>}
     */
    function generateInstructionsAsJSON(outputDir?: string): void;
    /**
     * Loads outer instructions from a directory.
     * @param {string} instructionsDir The directory to load instructions from.
     * @returns {IBDJSInstruction[]} The loaded instructions.
     */
    function loadOuterInstructions(instructionsDir: string): IBDJSInstruction[];
    /**
     * Generates a JSON file with the outer instructions.
     * @param {string} instructionsDir The directory to load instructions from.
     * @param {string} outputDir The directory to save the JSON file to.
     */
    function generateOuterInstructionsAsJSON(instructionsDir: string, outputDir?: string): void;
}
