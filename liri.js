require("dotenv").config();
var keys = require("./keys.js");
var request = require('request');
//spotify
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
//twitter
var twitter = require("twitter");
var client = new twitter(keys.twitter);
//Omdb
 

var command = process.argv[2];
var input = process.argv[3];

switch (command) {
  case "my-tweets":
    myTweets();
    break;
  case "spotify-this-song":
    spotifyMusic(input);
    break;
  case "movie-this":
    imdbMovie(input);
    break;  
}


  function imdbMovie(input) {
let T = input;
    request('http://www.omdbapi.com/?t='+T+'&y&apikey=trilogy', function (error, response, body) {
      console.log('error:', error); 
      console.log('statusCode:', response && response.statusCode);  
let results = JSON.parse(body);
        console.log("Movie Title: "+results.Title);
        console.log("Movie Year: "+results.Year);
        console.log("Rotten Tomatoes: "+results.Ratings[1].Value);
        console.log("Country Origin: "+results.Country);
        console.log("Languages: "+results.Language);
        console.log("Movie Plot: "+results.Plot);
        console.log("Actor/Actress: "+results.Actors);
    });
  
 }

function myTweets(input) {
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


function spotifyMusic(input) {

  spotify.search({ type: 'track', query: input, limit: 1 }, function (err, data) {
    if (err) {
       aceOfBase(data);
      return console.log('Error occurred: ' + err);
    }else{
    console.log("Artist Name: ",data.tracks.items[0].artists[0].name); //artist name
    console.log("Song Name: ",data.tracks.items[0].name); //Song Name
    console.log("Preview Link: ",data.tracks.items[0].href);// Song Preview
    console.log("Album Name: ",data.tracks.items[0].album.name);//Album Name
    }
  });

}

function aceOfBase(data) {
  spotify.search({ type: 'track', query: 'thriller', limit: 1 }, function (data) {
    console.log(data.tracks.items[0].artists[0].name, " <-----Artist Name"); //artist name
    console.log(data.tracks.items[0].name, " <-----Song Name"); //Song Name
    console.log(data.tracks.items[0].href, "<-----Preview Link");// Song Preview
    console.log(data.tracks.items[0].album.name, "<-----Album Name");//Album Name
  });
}