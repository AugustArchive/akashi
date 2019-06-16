const { stripIndents } = require('common-tags');
const CommandContext = require('../entities/context');

module.exports = class CommandService {
    /**
     * Creates a new base instance of `CommandService` interface
     * @param {import('../client')} client The client instance
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * Runs the command service
     * @param {import('eris').Message} m The message received
     */
    async run(m) {
        this.client.messagesSeen++;
        if (m.author.bot || !this.client.ready) return;

        const guild = await this.client.settings.get(m.channel.guild.id);

        let prefix = null;
        const mention = new RegExp(`^<@!?${this.client.user.id}> `).exec(m.content);
        const prefixes = [`${mention}`, this.client.commandPrefix, guild.prefix];

        for (const pre of prefixes) if (m.content.startsWith(pre)) prefix = pre;

        if (!prefix) return;

        const args = m.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift();
        const command = this.client.manager.commands.filter(c => c.command === commandName || c.aliases.includes(commandName));
        const context = new CommandContext(this.client, m, args);
        const sub = { is: false, instance: null };

        if (command.length > 0) {
            if (args.length) {
                for (const arg of args) {
                    if (command[0].subcommands.length && command[0].subcommands.find(sub => sub.name === arg)) {
                        sub.is = true;
                        sub.instance = command[0].subcommands.find(s => s.name === arg);
                    }
                }
            }

            const cmd = command[0];
            if (cmd.guildOnly && msg.channel.type === 1) return context.send(`Unable to run the \`${cmd.command}\` command because you're not in a guild.`);
            if (cmd.ownerOnly && !this.client.admins.includes(msg.author.id)) return context.send(`Unable to run the \`${cmd.command}\` command because you're not my owner!!`);

            try {
                if (sub.is) {
                    args.pop();
                    await sub.instance.run(this.client, context);
                    this.client.addCommandUsage(cmd.command, context.sender);
                    return;
                }
                await cmd.run(context);
                this.client.addCommandUsage(cmd.command, context.sender);
            } catch(ex) {
                const embed = this.client.getEmbed();
                embed
                    .setTitle(`Command ${cmd.command} failed`)
                    .setDescription(stripIndents`
                        \`\`\`js
                        ${ex.stack.split('\n')[0]}
                        ${ex.stack.split('\n')[1]}
                        ${ex.stack.split('\n')[2]}
                        ${ex.stack.split('\n')[3]}
                        \`\`\`
                        Contact \`August#5820\` in here: ***<https://discord.gg/7TtMP2n>***
                    `);
                context.embed(embed);
                this.client.logger.error(`Unable to run the ${cmd.command} command:\n${ex.stack}`);
            }
        }
    }
}