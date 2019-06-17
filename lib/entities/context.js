const ArgumentParser = require('../parsers/argument-parser');
const MessageCollector = require('./message-collector');

module.exports = class CommandContext {
    /**
     * Creates a new base instance of the `CommandContext` interface
     * @param {import('../client')} client The client instance
     * @param {import('eris').Message} message The message
     * @param {string[]} args The command arguments
     */
    constructor(client, message, args) {
        this.client = client;
        this.message = message;
        this.args = new ArgumentParser(args);

        /**
         * The guild
         * @type {import('eris').Guild}
         */
        this.guild = this.message.channel.guild;
        this.sender = this.message.author;
    }

    collector() {
        return new MessageCollector(this.client);
    }

    /**
     * Sends a message to the channel
     * @param {string} content The content to send
     */
    send(content) {
        return this.message.channel.createMessage(content);
    }

    /**
     * Sends an embed
     * @param {import('./embed-builder')} content The content to send
     */
    embed(content) {
        return this.message.channel.createMessage({
            embed: content.build()
        });
    }
}