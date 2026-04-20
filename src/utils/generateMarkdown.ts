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
        markdown += `**Usage:** \`\`\`\n${instruction.name}${instruction.args ? `[${instruction.args.map(arg => arg.name).join(', ')}]` : ''}\n\`\`\`\n\n`
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
}