require("dotenv").config();
var keys = require("./keys.js");
var request = require('request');
//spotify
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
//twitter
var twitter = require("twitter");
var client = new twitter(keys.twitter);
//File System
var fs = require("fs");
//User input
var command = process.argv[2];
var input = process.argv[3];
//put all command user inputs into object
var nodeArgs = process.argv;

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

function imdbMovie(input) {
  console.log(input);
if (input === "undefined") {
  console.log("failed")
}else{
  let T = input;

  request('http://www.omdbapi.com/?t=' + T + '&y&apikey=trilogy', function (error, response, body) {
  if (error) {
    console.log(error);
  }else{
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
}
function myTweets() {
  //The parameters for 
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

function aceOfBase() {
  spotify.search({ type: 'track', query: 'Ace of Base the Sign', limit: 1 }, function (err, data) {

    console.log("Artist Name: ", data.tracks.items[0].artists[0].name, );
    console.log("Song Name:", data.tracks.items[0].name);
    console.log("Preview Link:", data.tracks.items[0].href);
    console.log("Album Name: ", data.tracks.items[0].album.name, );
  });
}

function doWhatISays() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    console.log(data);
    let obj = JSON.parse(data);
    console.log(objected);
    // spotifyMusic(data);
  })
};