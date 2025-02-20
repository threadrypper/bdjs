import { BaseFunction } from '../structures/Function'
import Properties from '../util/Properties'
import type { GuildMember } from 'discord.js'

export default new BaseFunction({
	description: 'Get information from a new member.',
	parameters: [
		{
			name: 'Property',
			description: 'The property name.',
			required: true,
			resolver: 'String',
			value: 'none'
		}
	],
	allowFor: commandType => commandType === 'memberUpdate',
	code: async (d, [property]) => {
		if (property === undefined)
			throw new d.error(d, 'required', 'Property', d.function!.name)

		const types = Object.keys(Properties.Channel)
		if (!types.includes(property.toLowerCase()))
			throw new d.error(d, 'invalid', 'Property', d.function!.name)

		const member = d.getEnvironmentVariable(
			'__BDJS__NEW__MEMBER__'
		) as GuildMember

		return Properties.Member[property.toLowerCase()].code(member)
	}
})
