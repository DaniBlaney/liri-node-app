# Liri-node-app

LIRI is a Language Interpretation and Recognition Interface.
LIRI is a command line node app takes in parameters to search Spotify for songs, Bands in town for concerts and OMBD for movies.

## How to use
Use node to run this program. Use node liri.js then run one of the following comands, then add search text:

* `concert-this`
* `spotify-this-song`
* `movie-this`
* `doThis`

### When running a command follow it by desired text/search.
Example:
node liri.js movie-this Lord of the Rings

### When concert-this command is used you will be provided with:

<kbd>![Concert-this](concertthis.png)</kbd>

* Name of the venue
* Venue location
* Date of the Event

### When spotify-this-song command is used you will be provided with:

<kbd>![Spotify-this](spotifythis.png)</kbd>

* Artist(s)
* The song's name
* A preview link of the song from Spotify
* The album that the song is from
* If no song is provided then your program will default to "The Sign" by Ace of Base.

### When movie-this command is used you will be provided with:

<kbd>![Movie-this](moviethis.png)</kbd>

* Title of the movie.
* Year the movie came out.
* IMDB Rating of the movie.
* Rotten Tomatoes Rating of the movie.
* Country where the movie was produced.
* Language of the movie.
* Plot of the movie.
* Actors in the movie.
* If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.

### When doThis command:

<kbd>![Do-this](dothis.png)</kbd>

A random.txt file with search for spotify-this-song will give you the spotify results of "I want it that way."

[![Watch the demo video](liridemoscreen.png)](https://drive.google.com/file/d/1YaEromw8-bKrMDWGdGqi5C3X54wC4k8A/view?usp=sharing)

### Technologies Used
* JavaScript
* Node.js
* Spotify API
* Bands in Town API
* OMDB API
