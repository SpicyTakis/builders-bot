const fetch = require('node-fetch');

apiEndpoint = "https://api.github.com/repos/SpicyTakis/djs-bot-base/releases/latest"

run = async () => {
    let releases = await fetch(apiEndpoint);

    let latest = releases.json();


};

module.exports = run;