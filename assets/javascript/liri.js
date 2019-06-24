require('dotenv').config()

let axios = require('axios')
let keys = require('./keys.js')

// let spotify = new Spotify(keys.spotify)

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
function concertThis (artist) {
    console.log(artist)
    // axios
    //     .get('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp')
    //     .then(function (response) {
    //         console.log(response)
    //     })
}

// case 'spotify-this-song' function
function spotifyThis (artist) {
    console.log(artist)
}

// case 'movie-this' function
function movieThis (title) {
    console.log(title)
}

// case 'do-what-it-says' function
function doWhat (action) {
    console.log(action)
}