import { ChatInputCommandInteraction } from 'discord.js'
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
	description:
		'Check whether current interaction belongs to a slash command or not.',
	allowFor(type) {
		return type !== 'anyInteraction'
	},
	code: async d => {
		return d.ctx?.raw instanceof ChatInputCommandInteraction
	}
})
