import { type Activity, type AnyThreadChannel, type AutoModerationRule, type Guild, type GuildEmoji, type GuildMember, type Message, type PartialGuildMember, type PartialMessage, type Role, type Sticker, type TextChannel, User, type VoiceChannel } from 'discord.js';
import type { Bot } from '../structures/Bot';
type Member = GuildMember | PartialGuildMember;
declare const _default: {
    Activity: Record<string, {
        description: string;
        code: (a: Activity) => string | number | boolean | null | undefined;
    }>;
    AutomodRule: Record<string, {
        description: string;
        code: (a: AutoModerationRule) => string | number | boolean | null | undefined;
    }>;
    Bot: Record<string, {
        description: string;
        code: (a: Bot) => string | number | boolean | null | undefined;
    }>;
    Channel: Record<string, {
        description: string;
        code: (a: TextChannel | VoiceChannel) => string | number | boolean | null | undefined;
    }>;
    Emoji: Record<string, {
        description: string;
        code: (a: GuildEmoji) => string | number | boolean | null | undefined;
    }>;
    Guild: Record<string, {
        description: string;
        code: (a: Guild) => string | number | boolean | null | undefined;
    }>;
    Member: Record<string, {
        description: string;
        code: (a: Member) => string | number | boolean | null | undefined;
    }>;
    Message: Record<string, {
        description: string;
        code: (a: Message<boolean> | PartialMessage) => string | number | boolean | null | undefined;
    }>;
    Role: Record<string, {
        description: string;
        code: (a: Role) => string | number | boolean | null | undefined;
    }>;
    Sticker: Record<string, {
        description: string;
        code: (a: Sticker) => string | number | boolean | null | undefined;
    }>;
    Thread: Record<string, {
        description: string;
        code: (a: AnyThreadChannel) => string | number | boolean | null | undefined;
    }>;
    User: Record<string, {
        description: string;
        code: (a: User) => string | number | boolean | null | undefined;
    }>;
};
export default _default;
