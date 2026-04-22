import { IBDJSInstruction, InstructionArgOptions } from '@internal/Instruction'
import { recursiveReaddir } from './recursiveReaddir'
import { AsciiTable3 } from 'ascii-table3'
import { INTERNAL_INSTRUCTIONS_DIRECTORY } from '../constants'
import * as fs from 'fs'

export namespace MarkdownGenerator {
    /**
     * Generates an ASCII table for instruction arguments.
     * @param {InstructionArgOptions[]} args The arguments to generate a table for.
     * @returns {string} The ASCII table.
     */
    function generateArgumentTable(args: InstructionArgOptions[]) {
        const table = new AsciiTable3()
            .setStyle('github-markdown')
            .setHeading('Name', 'Description', 'Type', 'Required', 'Spread')
            .addRowMatrix(
                args.map(arg => [arg.name, arg.description, arg.type, arg.required ? 'Yes' : 'No', arg.spread ? 'Yes' : 'No'])
            )

        return table.toString()
    }

    /**
     * Base url to get the source code of the instructions.
     */
    const BASE_URL_SOURCE = 'https://raw.githubusercontent.com/threadrypper/bdjs/1.5/src/functions'

    /**
     * Generates the source code url for an instruction.
     * @param {string} name The name of the instruction.
     * @returns {string}
     */
    function getSourceUrl(name: string) {
        return `${BASE_URL_SOURCE}/${name}.ts`
    }

    /**
     * Gets all instructions from the internal instructions directory.
     */
    const instructions = recursiveReaddir(INTERNAL_INSTRUCTIONS_DIRECTORY)
        .map((dir) => require(dir).data)
        .filter((instruction) => instruction !== undefined) as IBDJSInstruction[]

    /**
     * Generates markdown documentation for instructions.
     * @param {IBDJSInstruction} instruction The instruction to generate documentation for.
     * @returns {string} The markdown documentation.
     */
    function generate(instruction: IBDJSInstruction) {
        let markdown = `# ${instruction.name}\n\n`

        markdown += `**Description:** ${instruction.description}\n\n`

        if (instruction.experimental) {
            markdown += `:::caution\nThis instruction is experimental and may not work as expected.\n\n`
        } else if (instruction.deprecated) {
            markdown += `:::danger\nThis instruction is deprecated and may be removed in the future.\n\n`
        }

        if (instruction.builder) {
            markdown += `:::note\nThis instruction is a builder and can be used only inside **${instruction.builderOptions.allowFor}**.\n\n`
        }

        markdown += `**Usage:**\n\`\`\`\n${instruction.name}${instruction.args ? `[${instruction.args.map(arg => arg.name).join(', ')}]` : ''}\n\`\`\`\n\n`
        if (instruction.args) {
            markdown += `**Arguments:**\n\n`
            markdown += generateArgumentTable(instruction.args) + `\n\n`
        }
        markdown += `**Source:** [${instruction.name}](${getSourceUrl(instruction.name.slice(1))})\n\n`

        return markdown
    }

    /**
     * Generates markdown documentation for all instructions.
     * @param {string} outputDir The directory to save the markdown files to.
     * @returns {Promise<void>}
     */
    export function generateAll(outputDir = './docs') {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir)
        }

        for (const instruction of instructions) {
            fs.writeFileSync(`${outputDir}/${instruction.name.slice(1)}.md`, generate(instruction))
        }
    }

    /**
     * Generates a JSON file with the internal instructions.
     * @param {string} outputDir The directory to save the JSON file to.
     * @returns {Promise<void>}
     */
    export function generateInstructionsAsJSON(outputDir = './docs') {
        const filename = 'instructions.internal'

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir)
        }

        fs.writeFileSync(`${outputDir}/${filename}.json`, JSON.stringify(instructions))
    }

    /**
     * Loads outer instructions from a directory.
     * @param {string} instructionsDir The directory to load instructions from.
     * @returns {IBDJSInstruction[]} The loaded instructions.
     */
    export function loadOuterInstructions(instructionsDir: string) {
        const outerInstructions = recursiveReaddir(instructionsDir)
            .map((dir) => require(dir).data)
            .filter((instruction) => instruction !== undefined) as IBDJSInstruction[]

        return outerInstructions
    }

    /**
     * Generates a JSON file with the outer instructions.
     * @param {string} instructionsDir The directory to load instructions from.
     * @param {string} outputDir The directory to save the JSON file to.
     */
    export function generateOuterInstructionsAsJSON(instructionsDir: string, outputDir = './docs') {
        const outerInstructions = loadOuterInstructions(instructionsDir)
        const filename = 'instructions.custom'

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir)
        }

        fs.writeFileSync(`${outputDir}/${filename}.json`, JSON.stringify(outerInstructions))
    }
}