# djs-bot-base
A simple template bot for djs

# Modules
Add modules to add features (that are not commands) to the bot.

Example Module:
```js
const express = require('express');
const package = require('../package.json')

const app = express();

class WebServer {
    constructor(bot) {
        this.Bot = bot

        app.get('/', async () => {
            res.send('Hello, world!')
        })
    }

    app.use((req, res, next) => {
        res.headers.set('discord-bot-version', package.version);
        next()
    })

    /**
     * Add more functions here. Maybe implement some sort of bot monitoring dashboard? 
     */
}

module.exports = async (bot) => {
    const Server = new WebServer();
    return true; 
}
```