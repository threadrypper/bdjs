import { BaseFunction } from '../structures/Function'
import { ModalSubmitInteraction } from 'discord.js'

export default new BaseFunction({
	description: 'Check whether current interaction belongs to a modal or not.',
	allowFor(type) {
		return type !== 'anyInteraction'
	},
	code: async d => {
		return d.ctx?.raw instanceof ModalSubmitInteraction
	}
})
