const mongoose = require('mongoose');

module.exports = class DatabaseManager {
    /**
     * Create a new instance of the `DatabaseManager` interface
     * @param {string} url The database url
     */
    constructor(url) {
        this.url = url;
    }

    async connect() {
        const m = await mongoose.connect(this.url, { useNewUrlParser: true });
        this.m = m;

        m.connection.on('error', e => this.client.logger.error(e));
        m.connection.once('open', () => this.client.logger.info('Connection to MongoDB opened!'));
    }
}