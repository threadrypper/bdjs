import { DiscordClient } from '@structures/DiscordClient'
import { recursiveReaddir } from '@utils/recursiveReaddir'
import { join } from 'path'

/**
 * The path where events are stored.
 */
const EVENTS_PATH = join(__dirname, '../events')

export class EventManager {
    /**
     * Loads all events.
     * @param client The discord client.
     */
    load(client: DiscordClient) {
        const files = recursiveReaddir(EVENTS_PATH, f => f.endsWith('.js'))
        files.forEach((directory) => {
            const event = require(directory).data
            client.on(event.name, event.run)
        })
    }
}
