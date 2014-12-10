// We need to require any libraries we want to use.
var express = require("express"),
    request = require("request"),
    app = express();

// Set EJS as the view engine
app.set("view engine", "ejs"); 

// Create a handler to respond to GET requests
// to our home page ("/").
app.get('/', function(req, res){
  res.render('index.ejs');
});

// Create a handler to respond to GET requests
// to our search page ("/search").
app.get('/search', function(req, res){

  // Grab the movie title from the URL query string.

  var searchTerm = req.query.movieTitle;

  // Build the URL that we're going to call.
  var url = "http://www.omdbapi.com/?s=" + searchTerm; 

  // Call the OMDB API searching for the movie.
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      // The body is a big string of JSON. We want to
      // turn it into an Object so we can more easily
      // dig into it.
      var obj = JSON.parse(body);

      // Render a template (results.ejs) and pass it
      // the search results and call them "movieList".
      res.render("results.ejs", {movieList: obj.Search});
    }
  });
});

//

var movies = [];

app.get('/show/:id', function(req, res){

  // Grab the movie title from the URL query string.
  var idNumber = req.params.id;

  // Build the URL that we're going to call.
  var url = "http://www.omdbapi.com/?i=" + idNumber + "&" + "plot=full";

  // Call the OMDB API searching for the movie.
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      // The body is a big string of JSON. We want to
      // turn it into an Object so we can more easily
      // dig into it.
      var obj2 = JSON.parse(body);
      console.log(obj2);

      // Render a template (results.ejs) and pass it
      // the search results and call them "movieList".
      res.render("show", {movie: obj2});
    }
  });
});


app.listen(3000);