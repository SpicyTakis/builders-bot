const Discord = require('discord.js')

const utils = require('./utils')
const config = require('./config.json')

const Bot = new utils.Bot(true, [ '362700421191565322' ]);

Bot.on('message', async (message) => {
    ctx = await Bot.getContext(message);

    if (ctx.isSelf) { return; }

    await Bot.processCommands(ctx);
})

Bot.login(config.token)