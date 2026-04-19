/**
 * Builds an error message.
 * @param headerMessage - The header message.
 * @param additionalInfo - Additional information.
 * @param sourceString - The source string.
 * @param line - The line number.
 * @returns {string} The error message.
 */
export default function buildErrorMessage(
    headerMessage: string,
    additionalInfo: string[],
    sourceString: string,
    line: number = NaN
) {
    return [
        headerMessage,
        ...additionalInfo.map((value) => `|-> ${value}`),
        `|-> Line: ${isNaN(line) ? 'Unknown' : line}`,
        `|-> Source: "${sourceString}"`,
        `|   ${' '.repeat(9)}${'^'.repeat(sourceString.length)}`,
        '|--------------------------------------------'
    ].join('\n')
}