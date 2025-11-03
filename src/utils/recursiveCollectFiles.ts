import { readdirSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Recursively collect all file paths inside a directory.
 * @param {string} path - The path to collect.
 * @param {(file: string) => boolean} cb - The callback condition to collect the files.
 * @returns {string[]}
 */
export function recursiveCollectFiles(
    path: string,
    cb: (file: string) => boolean = (file) => file.endsWith('.js')
): string[] {
    const collected: string[] = []
    const files = readdirSync(path, { withFileTypes: true })

    for (const file of files) {
        if (file.isDirectory()) {
            collected.push(...recursiveCollectFiles(join(path, file.name), cb))
        } else if (cb && cb(file.name)) {
            collected.push(join(path, file.name))
        }
    }

    return collected
}