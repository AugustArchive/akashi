import { Schema, Document, model } from 'mongoose';

export interface GuildModel extends Document {
    guildID: string;
    prefix: string;
    autoroles: string[];
    selfAssign: string[];
}

const schema = new Schema({
    guildID: String,
    prefix: String,
    autoroles: [String],
    selfAssign: [String]
});

const _model = model<GuildModel>('guilds', schema, 'guilds');

export default _model;