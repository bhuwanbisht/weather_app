const request = require('request');
const geocode = function(address, callback) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicG94ZXllMTA0OCIsImEiOiJja3R2dGI2MW4xbjd6MzJxZXQxZmdvYmJkIn0.xwM00_3LVWqTtBI1FLgu_g`;
    request({ url, json: true }, (error, { body } = {}) => {
        if(error) {
            callback("Unable to connect to server.", undefined);
        } else if(!body.features[0]) {
            callback("Invalid location entered.", undefined);
        } else {
            let latitude = body.features[0].center[1];
            let longitude = body.features[0].center[0];
            let placeName = body.features[0].place_name;
            callback(undefined, {
                latitude,
                longitude,
                placeName
            });
        }
    });
}
module.exports = geocode;