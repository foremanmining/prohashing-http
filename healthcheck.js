var request = require('request');

var serverPort = process.env.SERVER_PORT

request(`http://127.0.0.1:${serverPort}/status`, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        const info = JSON.parse(body);
        if (info.updating) {
            console.log('Okay');
            process.exit(0);
        }
    }
    console.log('Uh-oh');
    process.exit(1);
});
