require('dotenv').config()

let fs = require('fs')
let axios = require('axios')
let keys = require('./keys')

let Spotify = require('node-spotify-api')
let moment = require('moment')

let spotify = new Spotify(keys.spotify)

let request = process.argv[3]
let option = process.argv[2]

let choiceOptions = function (option, request) {
    switch (option) {
        case 'concert-this':
            concertThis(request)
            logCommand(option, request)
            break

        case 'spotify-this-song':
            if (request) {
                spotifyThis(request)
            }
            else {
                spotifyThis('the sign')
            }
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
            break
        default:
            console.log('LIRI is unable to process command')
            break
    }
}

// case 'concert-this' function
function concertThis(artist) {
    // console.log(artist)
    axios
        .get('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp')
        .then(function (response) {
            let data = response.data
            // console.log(data)
            console.log(`Number of Events: ${data.length}`)
            for (i = 0; i < data.length; i++) {
                console.log(`${i}.`)
                console.log(`Venue Name: ${data[i].venue.name}`)
                console.log(`Venue Location: ${data[i].venue.city},${data[i].venue.region}`)
                let date = data[i].datetime
                console.log(`Date: ${moment(date).format('L')}`)
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
            let results = data.tracks.items
            for (i = 0; i < results.length; i++) {
                console.log(`${i}.`)
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
            d = response.data
            console.log(`Title: ${d.Title}`)
            console.log(`Year: ${d.Year}`)
            console.log(`imdbRating: ${d.imdbRating}`)
            console.log(`Rating: ${d.Ratings[1].Source} ${d.Ratings[1].Value}`)
            console.log(`Country: ${d.Country}`)
            console.log(`Language: ${d.Language}`)
            console.log(`Plot: ${d.Plot}`)
            console.log(`Actors: ${d.Actors}`)
        })
}

// case 'do-what-it-says' function
function doWhat() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log('Error: ', err)
        }
        let command = data.split(',')
        if (command.length === 2) {
            choiceOptions(command[0].toString(), command[1].toString())
        } else {
            console.log('There are not enough commands to run successfully')
        }

    })
}

// log commands
function logCommand() {
    if (option && request) {
        fs.appendFile('log.txt', option + ' ' + request + '\n', function (err) {
            if (err) {
                console.log(err)
            }
        })
    }
    else {
        fs.appendFile('log.txt', option + '\n', function (err) {
            if (err) {
                console.log(err)
            }
        })
    }
}

choiceOptions(process.argv[2], process.argv[3])