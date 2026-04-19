import { getVersion } from '@utils/getVersion'
import { join } from 'path'

/**
 * The directory where the internal instructions are located.
 */
export const INTERNAL_INSTRUCTIONS_DIRECTORY = join(__dirname, 'instructions')

/**
 * The version of the library.
 */
export const BDJS_VERSION = getVersion()
