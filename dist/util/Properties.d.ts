import { type Activity, type AnyThreadChannel, type AutoModerationRule, type Guild, type GuildEmoji, type GuildMember, type Message, type PartialGuildMember, type PartialMessage, type Role, type Sticker, type TextChannel, User, type VoiceChannel } from 'discord.js';
import type { Bot } from '../structures/Bot';
type Member = GuildMember | PartialGuildMember;
declare const _default: {
    Activity: Record<string, {
        description: string;
        code: (a: Activity) => string | boolean | number | null | undefined;
    }>;
    AutomodRule: Record<string, {
        description: string;
        code: (a: AutoModerationRule) => string | boolean | number | null | undefined;
    }>;
    Bot: Record<string, {
        description: string;
        code: (a: Bot) => string | boolean | number | null | undefined;
    }>;
    Channel: Record<string, {
        description: string;
        code: (a: TextChannel | VoiceChannel) => string | boolean | number | null | undefined;
    }>;
    Emoji: Record<string, {
        description: string;
        code: (a: GuildEmoji) => string | boolean | number | null | undefined;
    }>;
    Guild: Record<string, {
        description: string;
        code: (a: Guild) => string | boolean | number | null | undefined;
    }>;
    Member: Record<string, {
        description: string;
        code: (a: Member) => string | boolean | number | null | undefined;
    }>;
    Message: Record<string, {
        description: string;
        code: (a: Message<boolean> | PartialMessage) => string | boolean | number | null | undefined;
    }>;
    Role: Record<string, {
        description: string;
        code: (a: Role) => string | boolean | number | null | undefined;
    }>;
    Sticker: Record<string, {
        description: string;
        code: (a: Sticker) => string | boolean | number | null | undefined;
    }>;
    Thread: Record<string, {
        description: string;
        code: (a: AnyThreadChannel) => string | boolean | number | null | undefined;
    }>;
    User: Record<string, {
        description: string;
        code: (a: User) => string | boolean | number | null | undefined;
    }>;
};
export default _default;
