const EmbedBuilder = require('./embed-builder');
const w = require('wumpfetch');

module.exports = class WebhookClient {
    /**
     * Creates a new instance of the `WebhookClient` interface
     * @param {string} url The discord webhook URL
     */
    constructor(url) {
        this.url = url;
    }

    /**
     * Sends a message from the webhook
     * @param {string | EmbedBuilder} content The content to send
     */
    send(content) {
        if (content instanceof EmbedBuilder) {
            const payload = content.build();
            w({
                url: this.url,
                method: 'POST',
                data: {
                    embeds: [payload]
                }
            }).send();
        } else {
            w({
                url: this.url,
                method: 'POST',
                data: {
                    content
                }
            }).send();
        }
    }
}