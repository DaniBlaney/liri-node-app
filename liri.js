var dotenv = require("dotenv").config();

var keys = require("./keys.js");
//var Spotify = require('node-spotify-api')
//var request = require('request')
//var fs = require('fs')


var spotify = new Spotify(keys.spotify);

//variable for input
var command = process.argv[2];
var input = process.argv[3];