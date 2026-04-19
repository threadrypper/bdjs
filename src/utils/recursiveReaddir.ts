import { readdirSync } from 'fs'
import { join } from 'path'

/**
 * Recursively reads a directory and returns all files.
 * @param directory The directory to read.
 * @returns {string[]} An array of file paths.
 */
export function recursiveReaddir(directory: string): string[] {
    const files: string[] = []
    const items = readdirSync(directory, { withFileTypes: true })

    for (const item of items) {
        const path = join(directory, item.name)
        if (item.isDirectory()) {
            files.push(...recursiveReaddir(path))
        } else {
            files.push(path)
        }
    }

    return files
}