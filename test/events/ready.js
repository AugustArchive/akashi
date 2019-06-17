const { Event } = require('../../lib');

module.exports = class ReadyEvent extends Event {
    constructor(client) {
        super(client, 'ready');
    }

    async emit() {
        this.client.logger.discord('Connected');
        this.client.editStatus('online', {
            name: `${this.client.commandPrefix}help | ${this.client.guilds.size} Guilds`,
            type: 0
        });
        this.client.webhook.send(
            this
                .client
                .getEmbed()
                .setTitle('Connected to Discord!')
        );
    }
}