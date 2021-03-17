const discord = require('discord.js');
const cluster = require('cluster')

const config = require('./config.json')

if (cluster.isMaster) {
    const manager = new discord.ShardingManager('./bot.js', { token: config.token })

    manager.spawn()

    console.log('Spawning Shards...')

    console.log('Shards spawned.')

    cluster.fork()

    console.log('Stats webserver started on port 3000.')
}

if (cluster.isWorker) {
    const express = require('express');
    const app = express();

    app.post('/api/:shardID/', (req, res) => {
        
    }) 
 
    app.get('/', (req, res) => {
        res.send('Hi!')
    })

    app.listen(3000)
}