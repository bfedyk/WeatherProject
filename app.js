// Define some fixed constants

// Acquire express.js framework
const express = require("express");

// Acquire body-bodyParser
const bodyParser = require("body-parser");

// Acquire native node https
const https = require("https");

// Use express module
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// Port the server listens on
const portNum = 3000;


// Parse the GET request to our server
app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

  // res.send("Server is up an running");
});

app.post("/", function(req, res){

// Get the body of the request using bodyParser
  // console.log(req.body.cityName);

  // Define remote endpoint server to send request to, then send GET request to obtain JSON object
  const city = req.body.cityName;
  const country = "UK";
  const appKey = "ea1f8414e2d086473464f1836c8faddc";
  const unit = "metric";

  const url="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appKey + "&units=" + unit;

  // console.log(url);

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){

      // Log all returned data
      const weatherData = JSON.parse(data);
      // console.log(weatherData);

      // To get a specific nested object from data
      const temp = weatherData.main.temp;
      console.log(temp);

      const description = weatherData.weather[0].description;
      console.log(description);

      // Get icon from openweather to match weather conditions
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      // Can create multiple writes
      res.write("<h1>The temperature in " + req.body.cityName + " is " + temp + " degrees Celcius<h1>");
      res.write("<p><h3>The weather is currently " + description +"</h3></p>");
      res.write("<img src=" + imageURL + ">");
      // Send response back to browser
      res.send();

    });

  });

});

// // Define remote endpoint server to send request to, then send GET request to obtain JSON object
// const city = "Ruislip";
// const country = "UK";
// const appKey = "ea1f8414e2d086473464f1836c8faddc";
// const unit = "metric";
//
// const url="https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&appid=" + appKey + "&units=" + unit;
//
// https.get(url, function(response){
//   console.log(response.statusCode);
//
//   response.on("data", function(data){
//
//     // Log all returned data
//     const weatherData = JSON.parse(data);
//     // console.log(weatherData);
//
//     // To get a specific nested object from data
//     const temp = weatherData.main.temp;
//     console.log(temp);
//
//     const description = weatherData.weather[0].description;
//     console.log(description);
//
//     // Get icon from openweather to match weather conditions
//     const icon = weatherData.weather[0].icon;
//     const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
//
//     // Can create multiple writes
//     res.write("<h1>The temperature in Ruislip is " + temp + " degrees Celcius<h1>");
//     res.write("<p><h3>The weather is currently " + description +"</h3></p>");
//     res.write("<img src=" + imageURL + ">");
//     // Send response back to browser
//     res.send();
//
//   });
//
// });

app.listen(portNum, function() {
  console.log("Server listening on port " + portNum);
});
