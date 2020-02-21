const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const forecastURL = "https://api.darksky.net/forecast/1178b1ea7f3a87ed65563256ac2464fc/" + latitude + "," + longitude + "?units=si";

    request({ url: forecastURL, json: true }, (error, response, body) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined);
        } else if (body.error) {
            callback("Unable to find the location.", undefined);
        } else {
            callback(undefined, {
                summary : body.daily.data[0].summary,
                currentTemp : body.currently.temperature,
                precipProbability : Math.round(body.currently.precipProbability * 100),
                minTemp : body.daily.data[0].temperatureMin,
                maxTemp : body.daily.data[0].temperatureMax
            });
        }
    });
}

module.exports = forecast;

