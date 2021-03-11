const Discord = require('discord.js')
const utils = require('./utils')

const Bot = new utils.Bot();

Bot.on('message', (message) => {
    if (message.author = Bot.user) { return }

    ctx = await Bot.getContext(message);

    
})