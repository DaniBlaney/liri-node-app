var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api')
var request = require('request')
var fs = require('fs')


var spotify = new Spotify(keys.spotify);

//variable for input
var command = process.argv[2];
var input = process.argv[3];

// spotify this song
function spotifySong(musicSearch) {

  if (musicSearch === undefined || null) {
    musicSearch = "";
  }

  spotify.search({type: 'track', query: musicSearch}, function (err, data)
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    else {
      for (i = 0; i < data.tracks.items.length && i < 5; i++){

        var musicQuery = data.tracks.items[i];
          console.log("Artist: " + musicQuery.artists[0].name + "\nSong Name: "
          + musicQuery.name + "\nAlbum Name: " + musicQuery.album.name);
      };
    };
  });
spotifySong();

//ombd movie-this
function movieThis (movieQuery) {

  if (movieQuery === undefined || null){
    movieQuery = "";
  }

  var queryURL = "http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&apikey=trilogy";
  console.log(queryURL)

  request(queryURL, function(error, response, body){
    if (!error && response.statusCode === 200){
      var movieData = JSON.parse(body);
        console.log("Movie Title: " + movieData.Title + "\nYear: " + movieData.released
        + "\nIMBD Rating: " + movieData.imbdRating + "\nRotten Tomatoes Rating: " +
        movieData.Ratings[1].Value + "\nCountry: " + movieData.Country + "\nLanguage: " +
        movieData.Language + "\nPlot: " + movieData.Plot + "\nActors: " + movieData.Actors)
    };
  });
};
movieThis();
