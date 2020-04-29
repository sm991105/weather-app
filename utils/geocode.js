const request = require("request");
// Synchronous way, just for demonstration purposes
/*
const GeoUrl =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/seoul.json?access_token=pk.eyJ1Ijoic205OTExMDUiLCJhIjoiY2s5ampsOHJoMWtxbTNlbndhcW02Z3djeSJ9.8gEY7YDkT59rHj7mkQ97Lw";
request({ url: GeoUrl, json: true }, (err, response) => {
  if (err) {
    console.log("Unable to connect to location services.");
  } else if (response.body.features.length === 0) {
    console.log("Location not found.");
  } else {
    const longitude = response.body.features[0].center[0];
    const latitude = response.body.features[0].center[1];
    console.log(longitude, latitude);
  }
});
*/

// Asynchronous
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic205OTExMDUiLCJhIjoiY2s5ampsOHJoMWtxbTNlbndhcW02Z3djeSJ9.8gEY7YDkT59rHj7mkQ97Lw";

  request({ url: url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to location services.", undefined);
    } else if (body.features.length === 0) {
      callback("Location not found.", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        placeName: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
