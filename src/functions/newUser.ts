import { BaseFunction } from '../structures/Function'
import Properties from '../util/Properties'
import type { User } from 'discord.js'

export default new BaseFunction({
	description: 'Get information from a new user.',
	parameters: [
		{
			name: 'Property',
			description: 'The property name.',
			required: true,
			resolver: 'String',
			value: 'none'
		}
	],
	allowFor: t => t === 'userUpdate',
	code: async (d, [property]) => {
		if (property === undefined)
			throw new d.error(d, 'required', 'Property', d.function!.name)

		const types = Object.keys(Properties.User)
		if (!types.includes(property.toLowerCase()))
			throw new d.error(d, 'invalid', 'Property', d.function!.name)

		const user = d.getEnvironmentVariable('__BDJS__NEW__USER__') as User

		return Properties.User[property.toLowerCase()].code(user)
	}
})
