const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("../../utils/forecast");
const geocode = require("../../utils/geocode");

const app = express();
const port = 3000;

// Define paths for Express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Joody Moody",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Joody Moody",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Help Joody Moody with funding!",
    title: "Help Page",
    name: "Joody Moody",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must specify address.",
    });
  }
  geocode(req.query.address, (err, { latitude, longitude, placeName } = {}) => {
    if (err) {
      return res.send({ err });
    }
    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({ err });
      }
      res.send({
        address: placeName,
        forecast: forecastData,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Joody Moody",
    errMsg: "Help article not found",
  });
});

app.get("*", (req, res) => {
  // wildcard!
  res.render("404", {
    title: "404",
    name: "Joody Moody",
    errMsg: "Page not found.",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
