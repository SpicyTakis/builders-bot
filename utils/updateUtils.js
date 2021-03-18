const fetch = require('node-fetch');
const admZip = require('adm-zip');
const request = require('superagent');
const fs = require('fs');

apiEndpoint = "https://api.github.com/repos/SpicyTakis/djs-bot-base/releases/latest"

run = async () => {
    let releases = await fetch(apiEndpoint, {
        headers: {
            "User-Agent" : "SpicyTakis"
        }
    });

    let latest = await releases.json();

    console.log(latest)

    request
        .get(latest.assets[0].browser_download_url)
        .on('error', function (error) {
            console.log(error);
        })
        .pipe(fs.createWriteStream('utils.zip'))
        .on('finish', function () {
            var zip = new admZip('utils.zip');
            console.log('start unzip');
            zip.extractAllTo('.', true);
            console.log('finished unzip');
        });
};

module.exports = run;