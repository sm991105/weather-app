const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

if (process.argv.length !== 3) {
  console.log("Please provide the right location.");
} else {
  const location = process.argv[2];

  geocode(location, (err, data) => {
    if (err) {
      return console.log(err);
    }
    forecast(data.latitude, data.longitude, (err, forecastData) => {
      if (err) {
        return console.log(err);
      }
      console.log(data.placeName);
      console.log(forecastData);
    });
  });
}
