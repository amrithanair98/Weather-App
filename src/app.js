const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Amritha Nair",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Amritha Nair",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Amritha Nair",
  });
});

app.get("/weather", (req, res) => {
  if (req.query.address) {
    geocode(req.query.address, (error, data) => {
      if (error) {
        return res.send({ error: error });
      }
      forecast(
        data.latitude,
        data.longitude,

        (error, forecastData) => {
          if (error) {
            return res.send({ error: error });
          }
          return res.send({
            forecast: forecastData,
            location: data.location,
            address: req.query.address,
          });
        }
      );
    });
  } else {
    res.send({
      error: "Please enter valid address",
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Amritha Nair",
    errorMessage: "Help article not found.",
  });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Amritha Nair",
    errorMessage: "Page not found.",
  });
});

app.listen(5000, () => {
  console.log("Server is up on port 5000.");
});
