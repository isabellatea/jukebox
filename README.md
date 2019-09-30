# Jukebox

A viewable, dynamic, interactive song playlist application.

## Table of Contents

1. [Link and Screenshot](#link-and-screenshot)
1. [Usage](#usage)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Roadmap](#roadmap)
1. [Environment](#environment)
1. [Team](#team)
1. [Contributing](#contributing)

## Link and Screenshot
Link: https://jukebox-pizza.herokuapp.com/

![JukeboxHomepage](https://i.ibb.co/vkHw6gh/pz.jpg)

## Usage

The JukeBox App allows a user to do the following:
- Search for songs & add songs to playlist
- Add a new user
- Upvote and downvote songs
- Play a song

### Search for songs & add songs to playlist
A user can go to the search page via the navigation menu. Once there, a user can type a song name in the input box and click the search button to see results. The user can select a song from the search results to add to the playlist.

If no username is selected when adding the song, the username associated with the added song will be `anonymous`

### Add a new user

To add a new user, go to the signup page via the navigation menu. Once added, the username should appear in the dropdown menu in the search page.

### Upvote and downvote songs
To upvote and downvote songs, click the correct buttons associated with each song on the playlist page. Songs are sorted based on their net vote count. A user can upvote or downvote a song more than once.

### Play a song
In order to play a song, the user must be logged in as host. To read more about this, please see [Placeholder]. Once logged in as host, the user should be able to see a button that says __Play top song__. If clicked, the top voted song will be sent to the player and that song will be removed from the playlist

### Logging in as host
For the song player to work you must click on 'Login as Host' and log into Spotify with a premium account. You will remain logged in for the session depending on your browser settings. Spotify Oath is used for host login and the redirect url for the development and production environments must be stored in the developers Spotify API account https://developer.spotify.com/my-applications/#!/applications.


## Development


### Installing Dependencies

> npm install

> nodemon server.js

### Roadmap


> npm start 

> localhost: 3000

> src/components: all components

> db: db files



## Environment
The project uses a gitignored file called env/credentials.js to supply the Spotify API keys as well as the redirect url and production env variable. Fill in your information to credentials.example.js and remove 'example' from the filename for the API and Webpack
environment to function correctly

## Spotify API Documentation
*Endpoint reference: https://developer.spotify.com/web-api/endpoint-reference/
*Authorization Code Flow (used for host login and player): https://developer.spotify.com/web-api/authorization-guide/#authorization-code-flow
*Client Credentials Flow (used for Spotify search): https://developer.spotify.com/web-api/authorization-guide/#client-credentials-flow
*Spotify-web-api-js (used in Playlist component for triggering playback) : https://doxdox.org/jmperez/spotify-web-api-js



## Team

  - Harsh Sikka
  - Candice Lai
  - Isabella Tea
  - Steve Rodriguez

  Legacy: Nick Havens, Jessica D'Andrea, Joey Li, and Vasanth Kesavan

  
## Contributing

> Please do. Submit a pull request :)