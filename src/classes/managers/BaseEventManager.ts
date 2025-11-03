import { recursiveCollectFiles } from '@utils/recursiveCollectFiles'
import type { DiscordClient } from '@structures/DiscordClient'
import { join } from 'node:path'

/**
 * The event manager class.
 */
export class EventManager {
    /**
     * The Discord client instance.
     */
    protected client: DiscordClient

    /**
     * Creates an instance of the base event manager.
     * @param client The Discord client instance.
     */
    constructor(client: DiscordClient) {
        this.client = client
    }

    /**
     * Loads native events.
     */
    loadNative() {
        const paths = recursiveCollectFiles(join(__dirname, '../../events'))

        console.debug(`[EventManager] Found ${paths.length} native event(s).`)
        
        return void 0
    }
}