const express = require("express");
const path = require("path");
const hbs = require("hbs");

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
  res.send({
    forecast: "17 degrees",
    location: "Philadelphia",
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
