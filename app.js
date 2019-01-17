var express = require('express')
var moment = require('moment')
var prohashing = require('prohashing')

var app = express()

var connectionStatus = false;
var profitabilityLastUpdate = moment()
var profitabilities = {}

// Status handler
app.get('/', function(req, res) {
    res.status(200).send();
})
app.get('/status', function(req, res) {
    now = moment()
    res.send({
        connected: connectionStatus,
        updating: moment.duration(now.diff(profitabilityLastUpdate)).asMinutes() <= 10,
        lastUpdates: {
            profitability: profitabilityLastUpdate.format()
        }
    });
})
app.get('/profitability', function(req, res) {
    res.send(profitabilities);
})
app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, function() {
    console.log('Listening on ' + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT);
})

// Prohashing API
const connection = new prohashing({
    apiKey: process.env.PROHASHING_API_KEY,
    debug: false,
    subscribe: ['profitability']
})
connection.on('profitability', (update) => {
    // Received a profitability update
    if (Array.isArray(update)) {
        for (var i = 0; i < update.length; i++) {
            Object.keys(update[i]).forEach(function(key) {
                profitabilities[key] = update[i][key]
            });
        }
    } else {
        Object.keys(update).forEach(function(key) {
            profitabilities[key] = update[key]
        });
    }
    profitabilityLastUpdate = moment()
})
connection.on("connected", (details, session) => {
    // Connected to the API
    console.log("Connected to Prohashing WAMP")
    connectionStatus = true;
})
