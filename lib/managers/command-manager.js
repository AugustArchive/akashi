const { readdir, readdirSync } = require('fs');
const { Collection } = require('@augu/immutable');
const CommandService = require('../services/command-service');
const { sep } = require('path');

module.exports = class CommandManager {
    /**
     * Creates a new base instance of the `CommandManager` interface
     * @param {import('../client')} client The client
     * @param {string} path The path
     */
    constructor(client, path) {
        this.client = client;
        /**
         * The commands collection
         * @type {Collection<import('../entities/command')>}
         */
        this.commands = new Collection({ name: 'commands' });
        this.service = new CommandService(client);
        this.path = path;
    }

    async start() {
        const groups = await readdirSync(this.path);
        for (let i = 0; i < groups.length; i++) {
            const cat = groups[i];
            readdir(`${this.path}${sep}${cat}`, (error, files) => {
                if (error) this.client.logger.error(error);
                this.client.logger.info(`Building ${files.length} commands...`);
                files.forEach(f => {
                    try {
                        const Command = require(`${this.path}${sep}${cat}${f}`);
                        const command = new Command(this.client);
                        this.commands.set(command.command, command);
                        this.client.logger.info(`Built the command ${command.command}!`);
                    } catch (ex) {
                        this.client.logger.error(ex);
                    }
                });
            });
        }
    }
}