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

//get spotify keys
var spotify = new Spotify(keys.spotify);

// spotify this song
// spotify.request('https://api.spotify.com/v1/search?q=track:' + songName + '&type=track&limit=10', function(error, songResponse) {
function spotifySong(song){
  spotify.search({type: 'track', query: song}, function(err,data){
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

// function spotifySong(musicSearch) {

//   if (musicSearch === undefined || null) {
//     musicSearch = "The Sign";
//   }

//   spotify.search({type: 'track', query: musicSearch}, function (err, data){
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     };
//     else {
//       for (i = 0; i < data.tracks.items.length && i < 5; i++){

//         var musicQuery = data.tracks.items[i];
//           console.log("Artist: " + musicQuery.artists[0].name + "\nSong Name: "
//           + musicQuery.name + "\nAlbum Name: " + musicQuery.album.name);
//       };
//     });
//   }
//   };
// spotifySong();

//ombd movie-this
function movieThis (response) {

  // if (movieQuery === undefined || null){
  //   movieQuery = inputTopic;
  // }

  var queryUrl = "http://www.omdbapi.com/?t=" + inputTopic + "&y=&plot=short&apikey=trilogy";
  console.log(queryUrl);

  var x = response.data;

  axios.get(queryUrl).then(function(response){
   console.log(x[0].Title);
    // if (!error && response.statusCode === 200){
    //   var movieData = JSON.parse(response);
    //   console.log(response.data[0].Title);
        // console.log("Movie Title: " + movieData.Title + "\nYear: " + movieData.released
        // + "\nIMBD Rating: " + movieData.imbdRating + "\nRotten Tomatoes Rating: " +
        // movieData.Ratings[1].Value + "\nCountry: " + movieData.Country + "\nLanguage: " +
        // movieData.Language + "\nPlot: " + movieData.Plot + "\nActors: " + movieData.Actors)
    });
};


// movieThis();

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
