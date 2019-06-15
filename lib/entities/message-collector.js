const { Collection } = require('@augu/immutable');

module.exports = class MessageCollector {
    /**
     * Create a new base instance of the `MessageCollector` interface
     * @param {import('../client')} client The client instance
     */
    constructor(client) {
        /**
         * The collector's collection
         * @type {Collection<Collector>}
         */
        this.collectors = new Collection({ name: 'collectors' });

        client.on('messageCreate', this.verify.bind(this));
    }

    /**
     * Verifies if the message is the collector
     * @param {import('eris').Message} m The message
     */
    verify(m) {
        if (!m.author) return;

        const collector = this.collectors.get(`${m.channel.id}:${m.author.id}`);
        if (collector && collector.filter(m)) collector.accept(m);
    }

    /**
     * Awaits an message
     * @param {(m: import('eris').Message) => boolean} filter The filter function
     * @param {AwaitInfo} info The info
     * @returns {Promise<import("eris").Message>} The message
     */
    awaitMessage(filter, info) {
        return new Promise((accept) => {
            if (this.collectors.has(`${info.channelID}:${info.userID}`)) this.collectors.delete(`${info.channelID}:${info.userID}`);

            this.collectors.set(`${info.channelID}:${info.userID}`, { filter, accept });
            setTimeout(accept.bind(null, false), info.timeout * 1000);
        });
    }
};

/**
 * @typedef {object} AwaitInfo
 * @prop {string} channelID The channel's ID
 * @prop {string} userID The user's id
 * @prop {number} timeout The timeout by seconds
 * 
 * @typedef {object} Collector
 * @prop {(m: import('eris').Message) => boolean} filter The filter function
 * @prop {(value?: PromiseLike<import('eris').Message> | import('eris').Message) => void} accept The `resolve` function from the Promise library
 */