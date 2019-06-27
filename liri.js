require('dotenv').config()

let fs = require('fs')
let axios = require('axios')
let keys = require('./keys')

let Spotify = require('node-spotify-api')
let moment = require('moment')

let spotify = new Spotify(keys.spotify)

let request = process.argv[3]
let option = process.argv[2]

switch (option) {
    case 'concert-this':
        concertThis(request)
        logCommand(option, request)
        break

    case 'spotify-this-song':
        spotifyThis(request)
        logCommand(option, request)
        break

    case 'movie-this':
        if (request) {
            movieThis(request)
        } else {
            movieThis('mr.nobody')
        }
        logCommand(option, request)
        break
    case 'do-what-it-says':
        doWhat(request)
        logCommand(option, request)
        break
    default:
        console.log('LIRI is unable to process command')
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
            // Artist(s)
            // The song 's name
            // A preview link of the song from Spotify
            // The album that the song is from
            let results = data.tracks.items
            // console.log(results[0])
            for (i = 0; i < results.length; i++) {
                console.log(`Artist(s): ${results[i].artists[0].name}`)
                console.log(`Song's Name: ${results[i].name}`)
                console.log(`Spotify Song Link: ${results[i].external_urls.spotify}`)
                console.log(`Album Name: ${results[i].album.name}`)
                console.log('----------------------------------------- \n')
            }
        })
}

// case 'movie-this' function
function movieThis(title) {
    axios
        .get('http://www.omdbapi.com/?apikey=trilogy&t=' + title)
        .then(function (response) {
            data = response.data
            // console.log(data)
            console.log('Title: ', data.Title)
            console.log('Year: ', data.Year)
            console.log('imdbRating: ', data.imdbRating)
            console.log('Rating: ', data.Ratings[1])
            console.log('Country: ', data.Country)
            console.log('Language: ', data.Language)
            console.log('Plot: ', data.Plot)
            console.log('Actors: ', data.Actors)
        })
}

// case 'do-what-it-says' function
function doWhat() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log('Error: ', err)
        }
        console.log(data)

    })
}

// log commands
function logCommand() {
    fs.appendFile('log.txt', option + ' ' + request + '\n', function (err) {
        if (err) {
            console.log(err)
        }
    })
}