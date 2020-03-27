const request = require('request');

const reverseGeocode = (latitude, longitude, callback) => {

    const reverseGeocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1Ijoicm9vcGluNjE5IiwiYSI6ImNrNnF2cnBjNTAwdXczdW8yeDMzOG9xNzEifQ.-iSiicFnfRgVnQgQDWMsVw`;

    request({ url: reverseGeocodeURL, json: true }, (error, response, body) => {
        if (error) {
            callback("Unable to connect to loaction services!", undefined);
        } else {
            callback(undefined, body.features[0].place_name);
        }
    });
}

module.exports = reverseGeocode;