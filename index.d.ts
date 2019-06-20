declare module '@yamashiro/akashi' {
    import Immutable from '@augu/immutable';
    import mongoose from 'mongoose';
    import Pikmin from 'pikmin';
    import Eris from 'eris';

    export const version: string;
    export class ArgumentParser {
        constructor(raw: string[]);
        public args: string[];
        public gather(sep?: string): string;
        public isEmpty(i: number): boolean;
        public get(i: number): string;
        public slice(arg: number, start?: number, end?: number): string;
    }
    export class Client extends Eris.Client {
        constructor(options: DefaultOptions);
        public manager: CommandManager;
        public events: EventManager;
        public database: DatabaseManager;
        public rest: RESTClient;
        public settings: GuildSettings;
        public logger: Pikmin.instance;
        public commandUsage: { [x: string]: CommandUsage };
        public messagesSeen: number;
        public webhook: WebhookClient;
        public commandPrefix: string;
        public util: Util;
        public build(): Promise<void>;
        public getEmbed(): EmbedBuilder;
        public addCommandUsage(cmd: Command, user: Eris.User): void;
    }
    export class Command {
        constructor(client: Client, info: CommandInfo);
        public command: string;
        public description: DescriptionSupplier;
        public usage: string;
        public category: string;
        public aliases: string[];
        public guildOnly: boolean;
        public ownerOnly: boolean;
        public hidden: boolean;
        public disabled: CommandDisabled;
        public subcommands: Subcommand[];
        public run(ctx: CommandContext): Promise<void>;
        public format(): string;
        public help(): Eris.EmbedOptions;
    }
    export class CommandContext {
        constructor(client: Client, m: Eris.Message, args: string[]);
        public client: Client;
        public message: Eris.Message;
        public args: ArgumentParser;
        public guild: Eris.Guild;
        public sender: Eris.User;
        public collector(): MessageCollector;
        public send(content: string): Promise<Eris.Message>;
        public embed(content: EmbedBuilder): Promise<Eris.Message>;
    }
    export class CommandManager {
        constructor(client: Client, path: string);
        public client: Client;
        public commands: Immutable.Collection<Command>;
        public path: string;
        public service: CommandService;
        public start(): Promise<void>;
    }
    export class CommandService {
        constructor(client: Client);
        public client: Client;
        public run(m: Eris.Message): Promise<void>;
    }
    export class DatabaseManager {
        constructor(url: string);
        public url: string;
        public m: typeof mongoose;
        public connect(): Promise<void>;
    }
    export class EmbedBuilder {
        constructor(data?: Embed);
        public title: string;
        public description: string;
        public color: number;
        public timestamp: number;
        public url: string;
        public author: EmbedAuthor;
        public thumbnail: EmbedThumbnail;
        public image: EmbedImage;
        public footer: EmbedFooter;
        public fields: EmbedField[];
        public setColor(color: ColorResolvable): this;
        public setTitle(title: string): this;
        public setDescription(text: StringResolvable): this;
        public setAuthor(name: string, url?: string, iconUrl?: string): this;
        public setThumbnail(url: string): this;
        public setURL(uri: string): this;
        public setFooter(text: string, iconUrl?: string): this;
        public setTimestamp(t?: Date | number): this;
        public setImage(url: string): this;
        public addField(name: string, value: string, inline?: boolean): this;
        public build(): Eris.EmbedOptions;
    }
    export class Event {
        constructor(client: Client, event: Emittable);
        public client: Client;
        public event: Emittable;
        public emit(...args: any[]): Promise<void>;
    }
    export class EventManager {
        constructor(client: Client, path: string);
        public client: Client;
        public path: string;
        public start(): void;
        public emit(event: Event): void;
    }
    export class GuildSettings implements Settings<GuildModel> {
        constructor();
        public model: mongoose.Model<GuildModel, {}>;
        public get(id: string): Promise<GuildModel>;
        public create(id: string): GuildModel;
        public remove(id: string): void;
        public update(id: string, doc: object, cb: (error: any, raw: any) => void): mongoose.Query<any>;
    }
    export class MessageCollector {
        constructor(client: Client);
        public collectors: Immutable.Collection<Collector>;
        public awaitMessage(filter: IAwaitFilter, info: IAwaitInfo): Promise<Eris.Message>;
    }
    export class PaginationBuilder<T> {
        constructor(fields?: T[], pageLength?: number);
        public paginate(page: string): IPaginated<T>;
    }
    export class RESTClient {
        constructor(client: Client);
        public client: Client;
        public getRole(query: string, guild: Eris.Guild): Promise<Eris.Role>;
        public getUser(query: string): Promise<Eris.User>;
        public getGuild(query: string): Promise<Eris.Guild>;
        public getChannel(query: string, guild: Eris.Guild): Promise<AnyRESTChannel>;
    }
    export class Util {
        public static rgbToInt(a: number, b: number, c: number): number;
        public static formatNumber(num: number): string;
        public static uppercase(str: string, spl: string = ' '): string;
        public static elipisis(str: string, spl: number = 2000): string;
        public static resolveString(str: StringResolvable): string;
        public static resolveColor(color: ColorResolvable): number;
        public static clone<T>(obj: any): T;
        public static randomNumber(o: number, s: number): number;
        public static parsePlatform(platform: NodeJS.Platform): 'Linux' | 'MacOS' | 'Windows' | 'Android' | 'Unknown';
        public static formatBytes(bits: number): string;
    }
    export class WebhookClient {
        constructor(url: string);
        public url: string;
        public send(payload: string | EmbedBuilder): Promise<void>;
    }
    export interface AkashiClientOptions {
        token: string;
        prefix: string;
        commands: string;
        events: string;
        databaseUrl: string;
        webhookUrl: string;
    }
    export type DefaultOptions = AkashiClientOptions & Eris.ClientOptions;
    export interface CommandUsage {
        size: number;
        users: Eris.User[];
    }
    export interface CommandInfo {
        command: string;
        description: DescriptionSupplier;
        usage?: string;
        category?: string;
        aliases?: string[];
        guildOnly?: boolean;
        ownerOnly?: boolean;
        hidden?: boolean;
        disabled?: CommandDisabled;
        subcommands?: Subcommand[];
    }
    export type DescriptionSupplier = string | ((client: Client) => string);
    export interface CommandDisabled {
        is: boolean;
        reason?: string;
    }
    export interface Subcommand {
        name: string;
        description: DescriptionSupplier;
        run: (client: Client, ctx: CommandContext) => Promise<void>;
    }
    export interface Embed {
        title?: string;
        description?: string;
        author?: EmbedAuthor;
        thumbnail?: EmbedThumbnail;
        fields?: EmbedField[];
        image?: EmbedImage;
        footer?: EmbedFooter;
        timestamp?: number;
        color?: number;
        type?: 'rich';
        url?: string;
    }
    export interface EmbedAuthor {
        name: string;
        url?: string;
        iconUrl?: string;
    }
    export interface EmbedThumbnail {
        url?: string;
    }
    export interface EmbedImage {
        url?: string;
    }
    export interface EmbedField {
        name: string;
        value: string;
        inline?: boolean;
    }
    export interface EmbedFooter {
        text: string;
        iconUrl?: string;
    }
    export type ColorResolvable  = number | number[];
    export type StringResolvable = string | string[];
    export type Emittable = "ready" | "disconnect" | "callCreate" | "callRing" | "callDelete" | "callUpdate" | 
        "channelCreate" | "channelDelete" | "channelPinUpdate" | "channelRecipientAdd"  | "channelRecepientRemove" | 
        "channelUpdate" | "friendSuggestionCreate" | "friendSuggestionDelete" | "guildAvaliable" | "guildBanAdd" | 
        "guildBanRemove" | "guildDelete" | "guildUnavaliable" | "guildCreate" | "guildEmojisUpdate" | "guildMemberAdd" | 
        "guildMemberChunk" | "guildMemberRemove" | "guildMemberUpdate" | "guildRoleCreate" | "guildRoleDelete" | 
        "guildRoleUpdate" | "guildUpdate" | "hello" | "messageCreate" | "messageDeleteBulk" | "messageReactionRemoveAll" | 
        "messageDeleteBulk" | "messageDelete" | "messageReactionAdd" | "messageReactionRemove" | "messageUpdate" | 
        "presenceUpdate" | "rawWS" | "unknown" | "relationshipAdd" | "relationshipRemove" | "relationshipUpdate" | 
        "typingStart" | "unavaliableGuildCreate" | "userUpdate" | "voiceChannelJoin" | "voiceChannelLeave" | 
        "voiceChannelSwitch" | "voiceStateUpdate" | "warn" | "debug" | "shardDisconnect" | "error" | 
        "shardPreReady" | "connect" | "shardReady" | "shardResume";
    export interface Settings<T extends mongoose.Document> {
        model: mongoose.Model<T, {}>;
        get(id: string): Promise<T>;
        create(id: string): T;
        remove(id: string): void;
        update(id: string, doc: object, cb: (error: any) => void): mongoose.Query<any>;
    }
    export interface GuildModel extends mongoose.Document {
        guildID: string;
        prefix: string;
        autoroles: string[];
        selfAssign: string[];
        logging: {
            enabled: boolean;
            channelID: string | null;
        }
        modlog: {
            enabled: boolean;
            channelID: string | null;
        }
    }
    export type IAwaitFilter = (m: Eris.Message) => boolean;
    export interface Collector {
        filter: IAwaitFilter;
        accept: (value?: PromiseLike<Eris.Message> | Eris.Message) => void;
    }
    export interface IAwaitInfo {
        channelID: string;
        userID: string;
        timeout: number;
    }
    export interface IPaginated<T> {
        items: T[];
        page: number;
        max: number;
    }
    export type AnyRESTChannel = Eris.TextChannel | Eris.VoiceChannel | Eris.CategoryChannel;
}