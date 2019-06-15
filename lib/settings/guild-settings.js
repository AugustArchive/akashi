const model = require('../models/guild');

module.exports = class GuildSettings {
    /**
     * Creates a new instance of the `GuildSettings` interface
     * @param {import('../client')} client The client
     */
    constructor(client) {
        this.client = client;
        this.model  = model;
    }

    /**
     * Gets the guild
     * @param {string} id The guild ID
     */
    get(id) {
        const guild = await this.model.findOne({ guildID: id }).exec();

        // Legacy guilds if not in the configuration
        if (!guild || guild === null) {
            const query = new this.model({ guildID: id, prefix: this.client.config.discord.prefix });
            query.save();
            return query;
        }

        return guild;
    }

    /**
     * Creates the guild's config
     * @param {string} id The guild ID
     */
    create(id) {
        const query = new this.model({ guildID: id, prefix: this.client.config.discord.prefix });
        query.save();
        return query;
    }

    /**
     * Removes the guild
     * @param {string} id The guild ID
     */
    remove(id) {
        return this.model.findOne({ guildID: id }).remove().exec();
    }

    /**
     * Update the guild's config
     * @param {string} id The guild ID
     * @param {any} doc The document to update
     * @param {(error: any, raw: any) => void} fun The callback function
     */
    update(id, doc, fun) {
        return this.model.updateOne({ guildID: id }, doc, fun);
    }
}