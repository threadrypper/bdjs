process.loadEnvFile()

const { DiscordClient } = require('./dist')
const { TOKEN } = process.env

const client = new DiscordClient({
    auth: `Bot ${TOKEN}`,
    events: [
        'onReady',
        'onMessageCreate'
    ],
    gateway: {
        intents: [
            'GUILDS',
            'GUILD_MESSAGES',
            'MESSAGE_CONTENT'
        ]
    },
    prefixes: ['!']
})