import { BaseFunction } from '../structures/Function'
import Properties from '../util/Properties'
import type { GuildEmoji } from 'discord.js'

export default new BaseFunction({
	description: 'Get information from an old emoji.',
	parameters: [
		{
			name: 'Property',
			description: 'The property name.',
			required: true,
			resolver: 'String',
			value: 'none'
		}
	],
	allowFor: t => t === 'emojiUpdate',
	code: async (d, [property]) => {
		if (property === undefined)
			throw new d.error(d, 'required', 'Property', d.function!.name)

		const types = Object.keys(Properties.Emoji)
		if (!types.includes(property.toLowerCase()))
			throw new d.error(d, 'invalid', 'Property', d.function!.name)

		const sticker = d.getEnvironmentVariable(
			'__BDJS__OLD__EMOJI__'
		) as GuildEmoji

		return Properties.Emoji[property.toLowerCase()].code(sticker)
	}
})
