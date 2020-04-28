const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

geocode("Seoul", (err, data) => {
  if (err) console.log(err);
  console.log(data);
});

forecast(37.56, 127, (err, data) => {
  if (err) console.log(err);
  console.log(data);
});
