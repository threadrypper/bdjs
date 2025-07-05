import { BaseFunction } from '../structures/Function';

export default new BaseFunction({
    description: 'Counts the length of a text.',
    parameters: [
        {
            name: 'Text',
            description: 'The text to count.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    async code(d, [text]) {
        if (!text) return new d.error(d, 'required', 'Text', d.function!.name);
        return text.length;
    }
});
