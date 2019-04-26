var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api')
var request = require('request')
var fs = require('fs')

//moment
var moment = require('moment');
moment().format();

//get spotify keys
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
    });

  };
spotifySong();

//ombd movie-this
function movieThis (movieQuery) {

  if (movieQuery === undefined || null){
    movieQuery = "";
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&apikey=trilogy";
  console.log(queryUrl)

  request(queryUrl, function(error, response, body){
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

// Bands in Town concertThis
function concertThis(bandQuery){

  var queryUrl = "https://rest.bandsintown.com/artists/" + bandQuery + "/events?app_id=codingbootcamp#";
  console.log(queryUrl);

  request(queryUrl, function (error, response, body){
    if (!error && response.statusCode ===200){

      var concertData = JSON.parse(body);
      console.log(concertData);
      var concertDateTime = concertData[0].datatime;
      var momentDateTime = moment().format('L');
      console.log("Venue Name: " + concertData[0].venue.name + "\nVenue Location: " + concertData[0].venue.city +
      "," + concertData[0].venue.country + "\nDate of the Event: " + momentDateTime);
    };
  });

};
