import { BaseFunction } from '../structures/Function'
import type { AutoModerationRule } from 'discord.js'
import Properties from '../util/Properties'

export default new BaseFunction({
	description: 'Get information from a new automod rule.',
	parameters: [
		{
			name: 'Property',
			description: 'The property name.',
			required: true,
			resolver: 'String',
			value: 'none'
		}
	],
	allowFor: (t) => t === 'automodRuleUpdate',
	code: async (d, [property]) => {
		if (property === undefined)
			throw new d.error(d, 'required', 'Property', d.function!.name)

		const types = Object.keys(Properties.AutomodRule)
		if (!types.includes(property.toLowerCase()))
			throw new d.error(d, 'invalid', 'Property', d.function!.name)

		const rule = d.getEnvironmentVariable(
			'__BDJS__NEW__RULE__'
		) as AutoModerationRule

		return Properties.AutomodRule[property.toLowerCase()].code(rule)
	}
})
