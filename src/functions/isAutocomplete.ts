import { BaseFunction } from '../structures/Function'
import { AutocompleteInteraction } from 'discord.js'

export default new BaseFunction({
	description: 'Check whether current interaction belongs to an autocomplete.',
	allowFor(type) {
		return type !== 'anyInteraction'
	},
	code: async d => {
		return d.ctx?.raw instanceof AutocompleteInteraction
	}
})
