const request = require('request');
const forecast = function(latitude, longitude, callback) {
    const url = `http://api.weatherstack.com/current?access_key=fbedd6fafb127fa989f887a2f9f1fd7e&query=${latitude},${longitude}&units=f`;
    request({ url, json: true }, (error, { body } = {}) => {
        if(error) {
            callback("Unable to connect to server.", undefined);
        } else if(body.error) {
            callback("Invalid Location.", undefined);
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                humidity: body.current.humidity,
                descriptions: body.current.weather_descriptions[0],
            });
        }
    });
}
module.exports = forecast;


