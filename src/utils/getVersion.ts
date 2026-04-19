import { readFileSync } from 'fs'
import { join } from 'path'

/**
 * Gets the version of the library.
 * @returns {string} The version of the library.
 */
export function getVersion(): string {
    return JSON.parse(readFileSync(join(__dirname, '..', '..', 'package.json'), 'utf-8')).version
}