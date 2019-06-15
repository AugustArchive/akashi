const Client = require('./client');

module.exports = {
    /**
     * Creates a new instance of the `AkashiClient` interface
     * @param {Client.DefaultOptions} options The options
     */
    create: (options) => new Client(options)
};