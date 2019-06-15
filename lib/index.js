module.exports = {
    ArgumentParser: require('./parsers/argument-parser'),
    Command: require('./entities/command'),
    CommandManager: require('./managers/command-manager'),
    CommandService: require('./services/command-service'),
    Context: require('./entities/context'),
    DatabaseManager: require('./managers/database-manager'),
    EmbedBuilder: require('./entities/embed-builder'),
    Event: require('./entities/event'),
    EventManager: require('./managers/event-manager'),
    GuildSettings: require('./settings/guild-settings'),
    MessageCollector: require('./entities/message-collector'),
    PaginationBuilder: require('./entities/pagination-builder'),
    RESTClient: require('./entities/rest-client'),
    WebhookClient: require('./entities/webhook-client'),

    /**
     * The current version of the Akashi command framework
     * @type {string}
     */
    version: require('../package.json')
};