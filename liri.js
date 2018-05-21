require("dotenv").config();
const keys = require("./keys.js");
const request = require('request');
//spotify
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
//twitter
const twitter = require("twitter");
const client = new twitter(keys.twitter);
//File System
const fs = require("fs");
//User input
const command = process.argv[2];
const input = process.argv[3];

//put all command user inputs into object
const nodeArgs = process.argv;

switch (command) {
  case "my-tweets":
    myTweets();
    break;
  case "spotify-this-song":
    spotifyMusic(input, nodeArgs);
    break;
  case "movie-this":
    imdbMovie(input);
    break;
  case "do-what-it-says":
    doWhatISays();
    break;
}
//IMDBMOVIE SEARCH
function imdbMovie(input) {
  let T = input;
  request('http://www.omdbapi.com/?t=' + T + '&y&apikey=trilogy', function (error, response, body) {
    //Trying to figure out the exact text of the error so I can use it in the if statements
    if (error || null || "undefined") {
      request('http://www.omdbapi.com/?t=mrnobody&y&apikey=trilogy', function (error, response, body) {
        let results = JSON.parse(body);
        console.log("Movie Title: " + results.Title);
        console.log();
        console.log("Movie Year: " + results.Year);
        console.log();
        console.log("Rotten Tomatoes: " + results.Ratings[0].Value);
        console.log();
        console.log("Country Origin: " + results.Country);
        console.log();
        console.log("Languages: " + results.Language);
        console.log();
        console.log("Movie Plot: " + results.Plot);
        console.log();
        console.log("Actor/Actress: " + results.Actors);
      })
     }else {
      let results = JSON.parse(body);
      console.log("Movie Title: " + results.Title);
      console.log();
      console.log("Movie Year: " + results.Year);
      console.log();
      console.log("Rotten Tomatoes: " + results.Ratings[0].Value);
      console.log();
      console.log("Country Origin: " + results.Country);
      console.log();
      console.log("Languages: " + results.Language);
      console.log();
      console.log("Movie Plot: " + results.Plot);
      console.log();
      console.log("Actor/Actress: " + results.Actors);
    }
  });
}
//TWITTER TWEETS
function myTweets() {
  var params = {
    screen_name: 'MRVMNST',
    q: "since:2018",
    count: 21
  };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      console.log(error);
    }
    for (var i = 0; i < params.count; i++) {
      console.log("Tweet no. " + i + " " + tweets[i].text);
    }
  });
}
//SPOTIFY SEARCH
function spotifyMusic(input, nodeArgs) {
  var userInpt = "";
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      userInpt = userInpt + " " + nodeArgs[i];
    }
    else {
      userInpt += nodeArgs[i];
    }
  }
  spotify.search({ type: 'track', query: userInpt, limit: 1 }, function (err, data) {
    if (err) {
      aceOfBase();
      console.log('An error occurred, so here is an awesome song: ');
    } else {
      console.log("Artist Name: ", data.tracks.items[0].artists[0].name); //artist name
      console.log("Song Name: ", data.tracks.items[0].name); //Song Name
      console.log("Preview Link: ", data.tracks.items[0].href);// Song Preview
      console.log("Album Name: ", data.tracks.items[0].album.name);//Album Name
    }
  });
}
//WRONG INPUT FOR SPOTIFY DEFAULT MUSIC
function aceOfBase() {
  spotify.search({ type: 'track', query: 'Ace of Base the Sign', limit: 1 }, function (err, data) {
    console.log("Artist Name: ", data.tracks.items[0].artists[0].name, );
    console.log("Song Name:", data.tracks.items[0].name);
    console.log("Preview Link:", data.tracks.items[0].href);
    console.log("Album Name: ", data.tracks.items[0].album.name, );
  });
}
// LIRI TEXT READER
function doWhatISays() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    let obj = JSON.parse(data);
    let textInpt = obj[1];
   spotify.search({ type: 'track', query: textInpt, limit: 1 }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Artist Name: ", data.tracks.items[0].artists[0].name); //artist name
      console.log("Song Name: ", data.tracks.items[0].name); //Song Name
      console.log("Preview Link: ", data.tracks.items[0].href);// Song Preview
      console.log("Album Name: ", data.tracks.items[0].album.name);//Album Name
    }
  });
  });
}
 