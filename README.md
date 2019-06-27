# Liri-Node-App

Screenshots are located here:https://github.com/Juwami/Liri-Node-App/tree/master/screenshots  

The app allows the user to run a search the Spotify API for track names, Bands in Town API for concert dates, and OMDB API for movies.  

## Directions
To start the app, use 'node liri.js', one of the options below, then follow up text you are searching for
* concert-this
* spotify-this-song
* movie-this
* do-what-it-says

Example: node liri.js concert-this 'billie eilish'

### concert-this
* Venue Name
* Venue Location
* Date of Event

### spotify-this-song
* Artist(s)
* Song Name
* Spotify Song Link
* Album Name

### move-this
* Movie Title
* Movie Release Year
* IMDB Rating
* Rotten Tomatoes Rating
* Country in which Movie is From
* Movie's Default Language
* Movie Plot
* Movie Actors

### do-what-it-says
* Reads the random.txt file and runs the commands listed

## Tech
* JavaScript
* Node.js
* Moment.js
* Axios
* DotEnv
* Node-Spotify-API
* OMDB API
* Bands in Town API