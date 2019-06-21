import guild, { GuildModel } from '../models/guild';
import { Model } from 'mongoose';
import Base from './base';

export default class GuildSettings implements Base<GuildModel> {
    public model: Model<GuildModel, {}> = guild;
    public client: any;

    constructor(client: any) {
        this.client = client;
    }

    async get(id: string) {
        const guild = await this.model.findOne({ guildID: id }).exec();
        if (!guild || guild === null) {
            const query = this.create(id);
            return query;
        }

        return guild;
    }

    create(id: string) {
        const query = new this.model({
            guildID: id,
            prefix: this.client.commandPrefix
        });
        query.save();
        return query;
    }

    remove(id: string) {
        return this.model.findOne({ guildID: id }).remove().exec();
    }

    update(id: string, doc: any, cb: (error: any, raw: any) => void) {
        return this.model.updateOne({ guildID: id }, doc, cb);
    }
}