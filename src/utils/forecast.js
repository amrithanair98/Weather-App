const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=e23d1b1d99e0a01e6652cd788b849407&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `The temperature today is ${body.current.temperature}, but it feels lik ${body.current.feelslike}.` +
          `The weather out there is ${body.current.weather_descriptions[0]} `
      );
    }
  });
};

module.exports = forecast;
