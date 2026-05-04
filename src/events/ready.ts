import { DiscordEventHandler } from '@core/DiscordEventHandler'

export const data = new DiscordEventHandler({
    name: 'ready',
    description: 'When the bot is ready.',
    run: (client) => {
        console.log(`Ready: ${client.user?.tag}`)
    }
})
