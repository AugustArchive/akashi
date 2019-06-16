const { Command } = require('../../../lib');

module.exports = class TestNormalCommand extends Command {
    constructor(client) {
        super(client, {
            command: 'test-sub',
            description: 'Runs a subcommand',
            usage: '<...args>',
            aliases: ['debug-sub'],
            category: 'Test',
            subcommands: [
                {
                    name: 'debug',
                    description: 'The debug subcommand',
                    run: (_, ctx) => ctx.send('hi!!!!11!!!111')
                }
            ]
        });
    }

    /**
     * Runs the `test` command
     * @param {import('../../../lib/entities/context')} ctx The command context
     */
    async run(ctx) {
        return ctx.send('u must run the `debug` subcommand');
    }
}