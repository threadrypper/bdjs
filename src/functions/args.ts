import { BaseFunction } from '../structures/Function'
import type { StringCommandTypes } from '../index'

const ALLOWED_EVENTS: StringCommandTypes[] = [
	'always',
	'prefixed',
	'unprefixed',
	'messageUpdate',
	'messageDelete'
]

export default new BaseFunction({
	description: 'Get context message arguments, if any.',
	parameters: [
		{
			name: 'Index',
			description: 'The index to get the argument.',
			required: false,
			resolver: 'Number',
			value: 'none'
		},
		{
			name: 'End Index',
			description: 'The index to slice message arguments.',
			required: false,
			resolver: 'Number',
			value: 'none'
		}
	],
	code: async (d, [index = '-1', endIndex]) => {
		if (!ALLOWED_EVENTS.includes(d.commandType))
			throw new d.error(d, 'disallowed', d.function!.name, 'Message Context')
		if (index === undefined)
			throw new d.error(d, 'required', 'Index', d.function!.name)
		if (Number.isNaN(Number(index)))
			throw new d.error(d, 'invalid', 'Index', d.function!.name)
		if (endIndex && Number.isNaN(Number(endIndex)))
			throw new d.error(d, 'invalid', 'End Index', d.function!.name)

		const args = d.getEnvironmentVariable('__BDJS__ARGS__')

		return endIndex
			? args.slice(Number(index), Number(endIndex)).join(' ')
			: Number(index) === -1
				? args.join(' ')
				: args[Number(index)]
	}
})
