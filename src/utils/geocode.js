const request = require("request");

const geocode = (address, callback) => {
  const url =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/` +
    encodeURIComponent(address) +
    `.json?access_token=pk.eyJ1IjoiYW1yaXRoYW5haXIiLCJhIjoiY2tuN3BnanY3MHFnZDMxcDd1cThvNHNpaCJ9.AXZ8m85ceWmNZY_UvBgshA&limit=1`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Could not fetch data", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location, find another search", undefined);
    } else {
      const data = {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      };

      callback(undefined, data);
    }
  });
};

module.exports = geocode;
