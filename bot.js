const Discord = require('discord.js')
const utils = require('./utils')

const Bot = new utils.Bot();

Bot.on('message', async (message) => {
    ctx = await Bot.getContext(message);

    if (ctx.isSelf) { return; }

    await Bot.processCommands(ctx);
})

Bot.login('NzU4MDQ3OTg2NzY3ODg4NTY1.X2pRMw.zpgqtlW0U')