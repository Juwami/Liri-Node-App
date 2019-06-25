require('dotenv').config()

let axios = require('axios')
let keys = require('./keys')

let Spotify = require('node-spotify-api')
let moment = require('moment')

let spotify = new Spotify(keys.spotify)

let request = process.argv[3]

switch (process.argv[2]) {
    case 'concert-this':
        concertThis(request)
        break

    case 'spotify-this-song':
        spotifyThis(request)
        break

    case 'movie-this':
        movieThis(request)
        break

    case 'do-what-it-says':
        doWhat(request)
        break
}

// case 'concert-this' function
function concertThis(artist) {
    console.log(artist)
    axios
        .get('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp')
        .then(function (response) {
            let data = response.data
            // console.log(data)
            console.log('Number of Events: ', data.length)
            for (i = 0; i < data.length; i++) {
                console.log(i + '.')
                console.log(data[i].venue.name)
                console.log(data[i].venue.city + ', ' + data[i].venue.region)
                let date = data[i].datetime
                console.log(moment(date).format('L'))
                console.log('------------------------------')
            }
        })
}

// case 'spotify-this-song' function
function spotifyThis(song) {
    spotify
        .search({
            type: 'track',
            query: song
        }, function (err, data) {
            if (err) {
                return console.log('Error occured: ', err)
            }
            console.log(data)
        })
}

// case 'movie-this' function
function movieThis(title) {
    console.log(title)
}

// case 'do-what-it-says' function
function doWhat(action) {
    console.log(action)
}