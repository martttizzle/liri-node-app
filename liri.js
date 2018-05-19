require("dotenv").config();
var keys = require("./keys.js");
var request = require('request'); 
//spotify
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
//twitter
var twitter = require("twitter");
var client = new twitter(keys.twitter);

var input = process.argv[2];
// var input = process.argv[3];

 
  var params = {
      screen_name: 'MRVMNST',
      q: "since:2018",
      count: 20
          };


  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(error);
     
  }
   for(var i = 0; i < 20; i++) {
      console.log("Tweet no. "+i+" "+tweets[i].text);

    }


  });

// spotify.search({ type: 'track', query: input, limit: 1 },function(err, data) {
//   if (err) {
//     // aceOfBase();
//     return console.log('Error occurred: ' + err);
//   }
 
// console.log(data.tracks.items[0].artists[0].name, " <-----Artist Name"); //artist name
// console.log(data.tracks.items[0].name, " <-----Song Name"); //Song Name
// console.log(data.tracks.items[0].href,"<-----Preview Link");// Song Preview
// console.log(data.tracks.items[0].album.name, "<-----Album Name");//Album Name
// });

// function aceOfBase() {
//     spotify.search({ type: 'track', query:'Sign', limit: 1 },function(data) {
//         console.log(data.tracks.items[0].artists[0].name, " <-----Artist Name"); //artist name
//         console.log(data.tracks.items[0].name, " <-----Song Name"); //Song Name
//         console.log(data.tracks.items[0].href,"<-----Preview Link");// Song Preview
//         console.log(data.tracks.items[0].album.name, "<-----Album Name");//Album Name
           
//         //   return console.log('Error occurred: ' + err);
         
//     });      
 

// }