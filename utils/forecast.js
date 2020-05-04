const request = require("request");

// Synchronous way
// const url =
//   "http://api.weatherstack.com/current?access_key=aba397db9a2c53c78e4e6c884dafd5fa&query=37.8267,-122.4233";

// request({ url: url, json: true }, (err, response) => {
//   if (err) {
//     // handle low-level errors
//     console.log("Unable to connect to weather services.");
//   } else if (response.body.success === false) {
//     console.log(response.body.error.info);
//   } else {
//     const temp = response.body.current.temperature;
//     const tempFeels = response.body.current.feelslike;
//     const description = response.body.current.weather_descriptions[0];
//     console.log(
//       `${description}.\nIt is currently ${temp} degrees out. It feels like ${tempFeels} degrees out.`
//     );
//   }
// });

// Asynchronous
const forcast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=aba397db9a2c53c78e4e6c884dafd5fa&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to weather services.");
    } else if (body.success === false) {
      callback(body.error.info);
    } else {
      const temp = body.current.temperature;
      const tempFeels = body.current.feelslike;
      const description = body.current.weather_descriptions[0];
      const humidity = body.current.humidity;
      const string =
        description +
        ". It is currently " +
        temp +
        " degrees out. It feels like " +
        tempFeels +
        " degrees out, Humidity of " +
        humidity +
        "%.";
      console.log(body);
      callback(undefined, string);
    }
  });
};

module.exports = forcast;
