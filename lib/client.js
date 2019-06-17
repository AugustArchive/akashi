const CommandManager = require('./managers/command-manager');
const EventManager = require('./managers/event-manager');
const DatabaseManager = require('./managers/database-manager');
const EmbedBuilder = require('./entities/embed-builder');
const WebhookClient = require('./entities/webhook-client');
const GuildSettings = require('./settings/guild-settings');
const RESTClient = require('./entities/rest-client');
const { Client } = require('eris');
const Pikmin = require('pikmin');

module.exports = class AkashiClient extends Client {
    /**
     * Creates a new instance of the `AkashiClient` class
     * @param {DefaultOptions} options The options
     */
    constructor(options) {
        super(options.token, options);

        this.manager       = new CommandManager(this, options.commands);
        this.events        = new EventManager(this, options.events);
        this.database      = new DatabaseManager(options.databaseUrl);
        this.rest          = new RESTClient(this);
        this.settings      = new GuildSettings(this);
        this.logger        = new Pikmin.instance({
            name: 'main',
            format: `${Pikmin.colors.bgMagentaBright(process.pid)} ${Pikmin.colors.bgCyanBright('%h:%m:%s')} [${Pikmin.colors.magenta('%l')}] <=> `,
            autogen: false,
            transports: [
                new Pikmin.ConsoleTransport({ name: 'info', process: process, format: `${Pikmin.colors.bgMagentaBright(process.pid)} ${Pikmin.colors.bgCyan('%h:%m:%s')} [${Pikmin.colors.green('%l')}] <=> ` }),
                new Pikmin.ConsoleTransport({ name: 'error', process: process, format: `${Pikmin.colors.bgMagentaBright(process.pid)} ${Pikmin.colors.bgCyan('%h:%m:%s')} [${Pikmin.colors.red('%l')}] <=> ` }),
                new Pikmin.ConsoleTransport({ name: 'discord', process: process, format: `${Pikmin.colors.bgMagentaBright(process.pid)} ${Pikmin.colors.bgCyan('%h:%m:%s')} [${Pikmin.colors.cyan('%l')}] <=> ` })
            ]
        });
        this.util          = require('./util');
        this.constants     = require('./util/constants');

        /**
         * The command usages
         * @type {{ [x: string]: CommandUsage; }}
         */
        this.commandUsage  = {};
        this.messagesSeen  = 0;
        this.webhook       = new WebhookClient(options.webhookUrl);
        this.commandPrefix = options.prefix;

        this.on('messageCreate', m => this.manager.service.run(m));
    }

    async build() {
        this.manager.start();
        this.events.start();
        this.database.connect();
        await super.connect();
    }
    
    getEmbed() {
        return new EmbedBuilder().setColor(this.constants.color);
    }

    /**
     * Adds the command to the command usage
     * @param {import('./entities/command')} command The command
     * @param {import('eris').User} user The sender
     */
    addCommandUsage(command, user) {
        if (!this.commandUsage[command.command]) this.commandUsage[command.command] = { size: 0, users: [] };
        this.commandUsage[command.command].size = this.commandUsage[command.command].size + 1;
        this.commandUsage[command.command].users.push(user);
    }
}

/**
 * @typedef {object} AkashiClientOptions
 * @prop {string} token The token
 * @prop {string} prefix The default command prefix
 * @prop {string} commands The commands path
 * @prop {string} events The events path
 * @prop {string} databaseUrl The database URL
 * @prop {string} webhookUrl The webhook URL
 * 
 * @typedef {object} CommandUsage
 * @prop {number} size The size
 * @prop {import('eris').User[]} users The users who executes
 * 
 * @typedef {AkashiClientOptions & import('eris').ClientOptions} DefaultOptions
 */