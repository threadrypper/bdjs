import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
	description: 'Returns the installed version of BDJS.',
	code: async d => require('../../package.json').version
})
