import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Converts a text to camel case.',
    parameters: [
        {
            name: 'Text',
            description: 'Text to be converted to camel case.',
            required: true,
            compile: false,
            value: 'none'
        }
    ],
    code: async (d, [text]) => {
        if (text === undefined) {
            throw new d.error(d, 'required', 'Text', d.function!.name)
        }

        return text.split(' ')
        .map((part, i) => {
            if (i === 0) {
                return part.toLowerCase()
            }

            return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        })
        .join('')
    }
})
