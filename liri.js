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
        spotifySong(inputTopic);
        break;
    case "movie-this":
        movieThis(inputTopic);
        break;
    case "concert-this":
        concertThis(inputTopic);
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
    else
      for (var i = 0; i < data.tracks.items.length; i++){

        var musicQuery = data.tracks.items[i];
        console.log("Artist: " + musicQuery.artists[0].name + "\nSong Name: "
          + musicQuery.name + "\nAlbum Name: " + musicQuery.album.name);
      };
  });
};

// spotifySong();

//ombd movie-this
function movieThis(inputTopic) {

  if (inputTopic === undefined || null){
    inputTopic = "Mr. Nobdy";
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + inputTopic + "&y=&plot=short&apikey=trilogy";
  console.log(queryUrl);

  axios.get(queryUrl).then(function(response){
    var movieData = response.data;
        console.log("Movie Title: " + movieData.Title + "\nYear: " + movieData.released
        + "\nIMBD Rating: " + movieData.imbdRating + "\nRotten Tomatoes Rating: " +
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
    // if (!error && response.statusCode ===200){

      var concertData = response.data;
      console.log(concertData);
      var concertDateTime = concertData[0].data.time;
      var momentDateTime = moment().format('L');
      console.log("Venue Name: " + concertData[0].venue.name + "\nVenue Location: " + concertData[0].venue.city +
      "," + concertData[0].venue.country + "\nDate of the Event: " + momentDateTime);

  });

};


//reads text from random.txt file
function doThis(){
  fs.readFile("random.txt", "utf8", function (err, data){
    if (error) throw err;
      var randomText = data.split(",");
      for (var i = 0; i < output.length; i++){
        console.log(output[i]);
      }
    // if (randomText.length == 2) {
    //   userInput(randomText[0], randomText[1]);
    // }
    // else if (randomText.length == 1) {
    //   userInput(randomText[0]);
    // }
  });
}
