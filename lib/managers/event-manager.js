const { readdir } = require('fs');
const { sep } = require('path');

module.exports = class EventManager {
    /**
     * Creates a new base instance of the `EventManager` interface
     * @param {import('../client')} client The client
     * @param {string} path The path
     */
    constructor(client, path) {
        this.client = client;
        this.path = path;
    }

    start() {
        readdir(this.path, (error, files) => {
            if (error) this.client.logger.error(error);
            this.client.logger.info(`Building ${files.length} events...`);
            files.forEach(f => {
                const Event = require(`${this.path}${sep}${f}`);
                const event = new Event(this.client);
                this.emit(event);
            });
        });
    }

    /**
     * Emit the event
     * @param {import('../entities/event')} event The event
     */
    emit(event) {
        const wrap = async(...args) => {
            try {
                await event['emit'](...args);
            } catch(ex) {
                this.client.logger.error(ex);
            }
        };

        this.client.on(event['event'], wrap);
    }
}