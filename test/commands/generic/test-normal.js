const { Command } = require('../../../lib');

module.exports = class TestNormalCommand extends Command {
    constructor(client) {
        super(client, {
            command: 'test',
            description: 'Runs a normal command w/o subcommands',
            usage: '<...args>',
            aliases: ['debug'],
            category: 'Test'
        });
    }

    /**
     * Runs the `test` command
     * @param {import('../../../lib/entities/context')} ctx The command context
     */
    async run(ctx) {
        if (ctx.args.isEmpty(0)) return ctx.send('no args!!!!!!!!11111!!!!!!');
        return ctx.send(ctx.args.gather(' '));
    }
}