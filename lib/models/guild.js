const { Schema, model } = require('mongoose');

const s = new Schema({
    guildID: String,
    prefix: String,
    autoroles: [String],
    selfAssign: [String],
    logging: {
        enabled: {
            type: Boolean,
            default: false
        },
        channelID: {
            type: String,
            default: null
        }
    },
    modlog: {
        enabled: {
            type: Boolean,
            default: false
        },
        channelID: {
            type: String,
            default: null
        }
    }
});

/**
 * The model
 * @type {import('mongoose').Model<GuildModel, {}>}
 */
const _model = model('guilds', s, 'guilds');

module.exports = _model;

/**
 * @typedef {object} GuildModel
 * @prop {string} guildID The guild ID
 * @prop {string} prefix The guild's custom prefix
 * @prop {string[]} autoroles The autoroles
 * @prop {string[]} selfAssign The self-assignable roles
 * @prop {Logging} logging The logging feature
 * @prop {ModLog} modlog The mod log feature
 * 
 * @typedef {object} Logging
 * @prop {boolean} enabled If the logging feature should be enabled
 * @prop {string} channelID The channel ID
 * 
 * @typedef {object} ModLog
 * @prop {boolean} enabled If the modlog feature should be enabled
 * @prop {string} channelID The channel ID
 */