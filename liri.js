require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require('axios');
var fs = require('fs');

//moment
var moment = require('moment');
moment().format();

//variable for input
var userInput = process.argv[2];
var inputTopic = process.argv.slice(3).join(" ");
console.log(inputTopic);

switch(userInput){
  case "spotify-this-song":
    if (inputTopic){
      spotifySong(inputTopic);
    } else {
      spotifySong("The Sign Ace of Base");
    }
      break;
  case "movie-this":
    if (inputTopic){
      movieThis(inputTopic);
    } else {
      movieThis("Mr.Nobody");
    }
      break;
  case "concert-this":
    if (inputTopic){
      concertThis(inputTopic);
    } else {
      concertThis("Radioactive");
    }
      break;
  case "doThis":
      doThis();
      break;
};


// spotify this song
function spotifySong(inputTopic){
    //get spotify keys
  var spotify = new Spotify(keys.spotify);

  spotify.search({type: 'track', query: inputTopic}, function(err, data){
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    else{

        var musicQuery = data.tracks.items[0];
        console.log("Artist: " + musicQuery.artists[0].name + "\nSong Name: "
          + musicQuery.name + "\nAlbum Name: " + musicQuery.album.name + "\nPreview Link: " + musicQuery.preview_url);
    };
  });
};

// spotifySong();

//ombd movie-this
function movieThis(inputTopic) {

  var queryUrl = "http://www.omdbapi.com/?t=" + inputTopic + "&y=&plot=short&apikey=trilogy";
  console.log(queryUrl);

  axios.get(queryUrl).then(function(response){
    var movieData = response.data;
        console.log("Movie Title: " + movieData.Title + "\nYear: " + movieData.Year
        + "\nIMBD Rating: " + movieData.imdbRating + "\nRotten Tomatoes Rating: " +
        movieData.Ratings[1].Value + "\nCountry: " + movieData.Country + "\nLanguage: " +
        movieData.Language + "\nPlot: " + movieData.Plot + "\nActors: " + movieData.Actors)

    });
};
// movieThis();

// Bands in Town concertThis
function concertThis(inputTopic){

  var queryUrl = "https://rest.bandsintown.com/artists/" + inputTopic + "/events?app_id=codingbootcamp#";
  console.log(queryUrl);

  axios.get(queryUrl).then(function(response){

      var concertData = response.data[0];
      // console.log(concertData);
      var momentData = moment(concertData.datetime).format('MM/DD/YYYY')
      console.log("Venue Name: " + concertData.venue.name + "\nVenue Location: " + concertData.venue.city +
      "," + concertData.venue.country + "\nDate of the Event: " + momentData);

  });

};


//reads text from random.txt file
function doThis(){
  fs.readFile("random.txt", "utf8", function (err, data){

      var randomText = data.split(",");
      console.log(randomText);

      });

    }
