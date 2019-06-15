module.exports = class AkashiCommand {
    /**
     * Creates a new instance of the `AkashiCommand` instance
     * @param {Client} client The client instance
     * @param {CommandInfo} info The information
     */
    constructor(client, info) {
        this.client = client;
        this.command = info.command;
        this.description = typeof info.description === 'function'? info.description(client): info.description;
        this.usage = info.usage             || '';
        this.category = info.category       || 'Generic';
        this.aliases = info.aliases         || [];
        this.guildOnly = info.guildOnly     || false;
        this.ownerOnly = info.ownerOnly     || false;
        this.hidden = info.hidden           || false;
        this.disabled = info.disabled       || { is: false, reason: null };
        this.subcommands = info.subcommands || [];
        this.parent = { group: null, file: null };
    }

    /**
     * Sets the parent for reloading/unloading/loading related STUFF
     * @param {string} group The category
     * @param {string} file The file name
     */
    setParent(group, file) {
        this.parent = {
            group,
            file
        };
        
        return this;
    }

    /**
     * Runs the command
     * @param {import('./context')} ctx The command context
     */
    async run(ctx) {
        return ctx.send(`Admiral, the command \`${this.command}\` can't be run. (\`NO_FUNCTION\`)`);
    }

    /**
     * Gives help on the command
     */
    help() {}

    /**
     * Formats the command's usage
     */
    format() {
        return `${this.client.commandPrefix}${this.command}${this.usage}`;
    }
};

/**
 * @typedef {object} CommandInfo
 * @prop {string} command The command's name
 * @prop {string|((client: Client) => string)} description The command's description as an string or an function to return a string
 * @prop {string} [usage] The command's usage (default: `''`)
 * @prop {string} [category] The command's category (default: `Generic`)
 * @prop {string[]} [aliases] The command's aliases (default: `[]`)
 * @prop {boolean} [guildOnly] Whenther or not to run the command in a Discord guild (default: `false`)
 * @prop {boolean} [ownerOnly] Whenther or not to run the command by the Commanders (default: `false`)
 * @prop {boolean} [hidden] Whenther or not to hide the command in the `help` command (default: `false`)
 * @prop {CommandDisabled} [disabled] An object to store if it is and why it's disabled: (default: `{ is: false, reason: null }`)
 * @prop {Subcommand[]} [subcommands] The command's "subcommands" (default: `[]`)
 * 
 * @typedef {object} CommandDisabled
 * @prop {boolean} is If the command is disabled
 * @prop {string} reason The reason why the command is disabled
 * 
 * @typedef {object} Subcommand
 * @prop {string} name The subcommand's name
 * @prop {string|((client: Client) => string)} description The subcommand's description
 * @prop {(client: Client, ctx: import('./context')) => Promise<void>} run The run function to run the subcommand
 */