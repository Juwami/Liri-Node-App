require('dotenv').config()

let axios = require('axios')
let keys = require('./keys.js')

// let spotify = new Spotify(keys.spotify)

let request = process.argv[3]

switch (process.argv[2]) {
    case 'concert-this':
        console.log('concert')
        concertThis(process.argv[2])
        break

    case 'spotify-this-song':
        console.log('spotify')
        break

    case 'movie-this':
        console.log('movie')
        break

    case 'do-what-it-says':
        console.log('do')
        break
}

// case 'concert-this' function
function concertThis (artist) {
    console.log(artist)
    axios
        .get('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp')
        .then(function (response) {
            console.log(response)
        })
}

// case 'spotify-this-song' function