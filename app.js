/*const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

if (process.argv.length !== 3) {
  console.log("Please provide the right location.");
} else {
  const location = process.argv[2];

  geocode(location, (err, { latitude, longitude, placeName } = {}) => {
    if (err) {
      return console.log(err);
    }
    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return console.log(err);
      }
      console.log(placeName);
      console.log(forecastData);
    });
  });
}
*/

console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.err) {
          console.log(data.err);
        } else {
          console.log(data.address);
          console.log(data.forecast);
        }
      });
    }
  );
});
