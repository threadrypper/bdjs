"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownGenerator = void 0;
const tslib_1 = require("tslib");
const recursiveReaddir_1 = require("./recursiveReaddir");
const ascii_table3_1 = require("ascii-table3");
const constants_1 = require("../constants");
const fs = tslib_1.__importStar(require("fs"));
var MarkdownGenerator;
(function (MarkdownGenerator) {
    /**
     * Generates an ASCII table for instruction arguments.
     * @param {InstructionArgOptions[]} args The arguments to generate a table for.
     * @returns {string} The ASCII table.
     */
    function generateArgumentTable(args) {
        const table = new ascii_table3_1.AsciiTable3()
            .setStyle('github-markdown')
            .setHeading('Name', 'Description', 'Type', 'Required', 'Spread')
            .addRowMatrix(args.map(arg => [arg.name, arg.description, arg.type, arg.required ? 'Yes' : 'No', arg.spread ? 'Yes' : 'No']));
        return table.toString();
    }
    /**
     * Base url to get the source code of the instructions.
     */
    const BASE_URL_SOURCE = 'https://raw.githubusercontent.com/threadrypper/bdjs/1.5/src/functions';
    /**
     * Generates the source code url for an instruction.
     * @param {string} name The name of the instruction.
     * @returns {string}
     */
    function getSourceUrl(name) {
        return `${BASE_URL_SOURCE}/${name}.ts`;
    }
    /**
     * Gets all instructions from the internal instructions directory.
     */
    const instructions = (0, recursiveReaddir_1.recursiveReaddir)(constants_1.INTERNAL_INSTRUCTIONS_DIRECTORY)
        .map((dir) => require(dir).data)
        .filter((instruction) => instruction !== undefined);
    /**
     * Generates markdown documentation for instructions.
     * @param {IBDJSInstruction} instruction The instruction to generate documentation for.
     * @returns {string} The markdown documentation.
     */
    function generate(instruction) {
        let markdown = `# ${instruction.name}\n\n`;
        markdown += `**Description:** ${instruction.description}\n\n`;
        if (instruction.experimental) {
            markdown += `:::caution\nThis instruction is experimental and may not work as expected.\n\n`;
        }
        else if (instruction.deprecated) {
            markdown += `:::danger\nThis instruction is deprecated and may be removed in the future.\n\n`;
        }
        if (instruction.builder) {
            markdown += `:::note\nThis instruction is a builder and can be used only inside **${instruction.builderOptions.allowFor}**.\n\n`;
        }
        markdown += `**Usage:**\n\`\`\`\n${instruction.name}${instruction.args ? `[${instruction.args.map(arg => arg.name).join(', ')}]` : ''}\n\`\`\`\n\n`;
        if (instruction.args) {
            markdown += `**Arguments:**\n\n`;
            markdown += generateArgumentTable(instruction.args) + `\n\n`;
        }
        markdown += `**Source:** [${instruction.name}](${getSourceUrl(instruction.name.slice(1))})\n\n`;
        return markdown;
    }
    /**
     * Generates markdown documentation for all instructions.
     * @param {string} outputDir The directory to save the markdown files to.
     * @returns {Promise<void>}
     */
    function generateAll(outputDir = './docs') {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }
        for (const instruction of instructions) {
            fs.writeFileSync(`${outputDir}/${instruction.name.slice(1)}.md`, generate(instruction));
        }
    }
    MarkdownGenerator.generateAll = generateAll;
    /**
     * Generates a JSON file with the internal instructions.
     * @param {string} outputDir The directory to save the JSON file to.
     * @returns {Promise<void>}
     */
    function generateInstructionsAsJSON(outputDir = './docs') {
        const filename = 'instructions.internal';
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }
        fs.writeFileSync(`${outputDir}/${filename}.json`, JSON.stringify(instructions));
    }
    MarkdownGenerator.generateInstructionsAsJSON = generateInstructionsAsJSON;
    /**
     * Loads outer instructions from a directory.
     * @param {string} instructionsDir The directory to load instructions from.
     * @returns {IBDJSInstruction[]} The loaded instructions.
     */
    function loadOuterInstructions(instructionsDir) {
        const outerInstructions = (0, recursiveReaddir_1.recursiveReaddir)(instructionsDir)
            .map((dir) => require(dir).data)
            .filter((instruction) => instruction !== undefined);
        return outerInstructions;
    }
    MarkdownGenerator.loadOuterInstructions = loadOuterInstructions;
    /**
     * Generates a JSON file with the outer instructions.
     * @param {string} instructionsDir The directory to load instructions from.
     * @param {string} outputDir The directory to save the JSON file to.
     */
    function generateOuterInstructionsAsJSON(instructionsDir, outputDir = './docs') {
        const outerInstructions = loadOuterInstructions(instructionsDir);
        const filename = 'instructions.custom';
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }
        fs.writeFileSync(`${outputDir}/${filename}.json`, JSON.stringify(outerInstructions));
    }
    MarkdownGenerator.generateOuterInstructionsAsJSON = generateOuterInstructionsAsJSON;
})(MarkdownGenerator || (exports.MarkdownGenerator = MarkdownGenerator = {}));
