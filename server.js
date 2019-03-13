// Using the tools and techniques you learned so far,
// you will scrape a website of your choice, then place the data
// in a MongoDB database. Be sure to make the database and collection
// before running this exercise.

// Consult the assignment files from earlier in class
// if you need a refresher on Cheerio.

// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");
const mongoose = require("mongoose");

// Initialize Express
var app = express();

var PORT = 3000;

// Initialize Express
var app = express();

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });


app.use(express.static("public"));
// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Main route (simple Hello World Message)
app.get("/", function(req, res) {
  res.sendFile("/Users/sydneyvolk/code/AZCHA201901FSF2-FT/18-mongo-mongoose/01-Activities/11-Scraping-into-a-db/Unsolved/index.html");
});

// TODO: make two more routes

// Route 1
// =======
// This route will retrieve all of the data
// from the scrapedData collection as a json (this will be populated
// by the data you scrape using the next route)

app.get("/all", function(req, res) {
  axios.get("https://www.npr.org/").then(function(response) {
    var $ = cheerio.load(response.data);

    // An empty array to save the data that we'll scrape
    var results = [];

    $("div.story-text").each(function(i, element) {
      // Save the text of the element in a "title" variable
      var title = $(element)
        .find("h3.title")
        .text();
      var link = $(element)
        .find("a")
        .attr("href");

      // Save these results in an object that we'll push into the results array we defined earlier
      results.push({
        title: title,
        link: link
      });
    });

    // Log the results once you've looped through each of the elements found with cheerio
    console.log(results);
  });
});

// Route 2
// =======
// When you visit this route, the server will
// scrape data from the site of your choice, and save it to
// MongoDB.
// TIP: Think back to how you pushed website data
// into an empty array in the last class. How do you
// push it into a MongoDB collection instead?

app.get("/all/db", function(req, res) {
  console.log("listening");
  axios.get("https://www.npr.org/").then(function(response) {
    var $ = cheerio.load(response.data);

    // An empty array to save the data that we'll scrape
    var results = [];


    $("div.story-text").each(function(i, element) {
      // Save the text of the element in a "title" variable
      var title = $(element)
        .find("h3.title")
        .text();
      var link = $(element)
        .find("a")
        .attr("href");
      console.log(title);
      console.log(link);
      if (title != undefined && link != undefined) {
        // Save these results in an object that we'll push into the results array we defined earlier
        results.push({
          title: title,
          link: link
        });
      }
    });

    // Log the results once you've looped through each of the elements found with cheerio
    db.scrapedData.insert({ results }, function (error, data){
      res.json(data)
      // displayResults(data);
    })

  });
});

// function displayResults(data) {
//   // First, empty the table
//   $("tbody").empty();


//   // Then, for each entry of that json...
//   data.forEach(function(data) {
//     // Append each of the animal's properties to the table
//     var tr = $("<tr>").append(
//       $("<td>").text(results[i].title),
//       $("<td>").text(results[i].link),
//     );

//     $("#results").append(tr);
//   });
// }

/* -/-/-/-/-/-/-/-/-/-/-/-/- */

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
