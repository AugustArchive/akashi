import Pikmin from 'pikmin';
import Eris from 'eris';

declare module '@yamashiro/akashi' {
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
    }
}