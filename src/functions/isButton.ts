import { BaseFunction } from '../structures/Function'
import { ButtonInteraction } from 'discord.js'

export default new BaseFunction({
	description: 'Check whether current interaction belongs to a button or not.',
	allowFor(type) {
		return type !== 'anyInteraction'
	},
	code: async d => {
		return d.ctx?.raw instanceof ButtonInteraction
	}
})
