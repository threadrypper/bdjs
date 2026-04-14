import { BaseFunction } from '../structures/Function'
import Properties from '../util/Properties'
import type { Activity } from 'discord.js'

export default new BaseFunction({
	description: 'Get information from a new activity.',
	parameters: [
		{
			name: 'Property',
			description: 'The property name.',
			required: true,
			resolver: 'String',
			value: 'none'
		}
	],
	allowFor(type) {
		return type === 'presenceUpdate'
	},
	code: async (d, [property]) => {
		if (property === undefined)
			throw new d.error(d, 'required', 'Property', d.function!.name)

		const types = Object.keys(Properties.Activity)
		if (!types.includes(property.toLowerCase()))
			throw new d.error(d, 'invalid', 'Property', d.function!.name)

		const activity = d.getEnvironmentVariable(
			'__BDJS__NEW__PRESENCE__'
		) as Activity

		return Properties.Activity[property.toLowerCase()].code(activity)
	}
})
