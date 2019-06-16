const { Client } = require('../lib');
const config = require('./config');
const { sep } = require('path');

const cli = new Client({
    token: config.token,
    prefix: config.prefix,
    commands: `${process.cwd()}${sep}commands`,
    events: `${process.cwd()}${sep}events`,
    databaseUrl: config.databaseUrl,
    webhookUrl: config.webhookUrl,
    disableEveryone: true,
    getAllUsers: true
});

cli.build();