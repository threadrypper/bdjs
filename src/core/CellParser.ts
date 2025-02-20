/**
 * Parses the given cells.
 * @param text - The text to resolve.
 * @param cellName - The cell name to resolve.
 * @param value - The new value.
 * @returns {string}
 */
export const parcells = (text: string, cellName: string, value: string) => {
	return text.replaceAll(`{${cellName.trim()}}`, value)
}
