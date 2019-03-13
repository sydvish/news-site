// We'll be rewriting the table's data frequently, so let's make our code more DRY
// by writing a function that takes in 'animals' (JSON) and creates a table body
function displayResults(data) {
  console.log(data.results);
  var results = data.results;
  // First, empty the table
  $("card").empty();

  for (var i = 0; i < results.length; i++) {

    var tr = $("<div>", { class: "card-body" }).append(
      $("<div>", { class: "card-title" }).text(results[i].title),
      $("<div>", { class: "card-title" }).text(results[i].teaser),
      $("<a>", { class: "card-text" })
        .attr({ href: results[i].link, target: "_blank" })
        .text("link"),
      $("<a>", {class: "button"})
    );

    $("#results").append(tr);
  };

}

  
// Bonus function to change "active" header
function setActive(selector) {
  // remove and apply 'active' class to distinguish which column we sorted by
  $("th").removeClass("active");
  $(selector).addClass("active");
  console.log(selector);
}

// Function to clear article data from the screen by clicking clear button
function clearArticles(data) {
  $("th").removeClass("active");
  // $(selector).addClass("active");
  console.log(data);
}

// 1: On Load
// ==========

// First thing: ask the back end for json with all animals
$.getJSON("/all/db", function(data) {
  // Call our function to generate a table body
  displayResults(data);
});

// 2: Button Interactions
// ======================

// When user clicks the scrape new articles button, display table sorted by weight
$("#button1").on("click", function() {
  // Set new column as currently-sorted (active)
  setActive(".card-body");

  // Do an api call to the back end for json with all animals sorted by weight
  $.getJSON("/all/db", function(data) {
    // Call our function to generate a table body
    displayResults(data);
    console.log(data);
  });
});

// When this button is clicked we want all the articles cleared and
$("#button2").on("click", function() {
  clearArticles(results);
  console.log(results);

  $.getJSON("/all/db", function(data) {
    // Call our function to generate a table body
    clearArticles(data);
    console.log(data);
  });
});
