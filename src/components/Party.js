import React from 'react';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-js';
import PlaylistEntry from './PlaylistEntry';
import PlayerGuest from './PlayerGuest.js';
import PlaylistSelector from './PlaylistSelector.js';
import StartParty from './StartParty.js';
import sampleData from '../lib/sampleData.js';
import Playlist from './Playlist.js';
import PlayerHost from './PlayerHost.js';
import Search from './Search.js';

const spotifyApi = new SpotifyWebApi();


class Party extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      userType: null,
      partyCode: null,

      currentPlaylist: '',
      songs: null,
      currentSong: '',
      interval: null,
      deviceId: '',
      playlists: ''
    }

    this.getAllSongs = this.getAllSongs.bind(this);
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
    this.joinAsGuest = this.joinAsGuest.bind(this);
    this.getDeviceId = this.getDeviceId.bind(this);
    this.getHostInfo = this.getHostInfo.bind(this);
    this.getSpotifyToken = this.getSpotifyToken.bind(this);
    this.createNewPlaylist = this.createNewPlaylist.bind(this);
    this.getExistingPlaylists = this.getExistingPlaylists.bind(this);
    this.handleCurrentPlaylistClick = this.handleCurrentPlaylistClick.bind(this);
    // this.songEnded = this.songEnded.bind(this);
    this.getPlaylistSongs = this.getPlaylistSongs.bind(this);
    this.createNewPlaylist = this.createNewPlaylist.bind(this);
    this.getCurrentSong = this.getCurrentSong.bind(this);
    this.switchToGuest = this.switchToGuest.bind(this);
    this.switchToHost = this.switchToHost.bind(this);
  }

  componentDidMount() {
    this.getSpotifyToken();
    // this.getAllSongs();
  }

  getAllSongs() {
    axios.get(`/songs`)
    .then((response) => {
      this.setState({
        songs: response.data
      })
    })
    .catch((err) => {
      console.error.bind(err);
    })
  }

  //Should get info about the currently playing song, to be displayed on guest dashboard
  getCurrentSong() {
    axios.get('/currentlyPlaying')
    .then((response) => {
      console.log("Currently Playing:",response.data);
      this.setState({
        currentSong: response.data.item.id
      })
    })
    .catch((err) => {
      console.error.bind(err);
    })
  }

  upVote(song) {
    song.vote = 1;
    axios.put('/song', song)
    .then((response) => {
      this.getAllSongs();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  downVote(song) {
    song.vote = -1;
    axios.put('/song', song)
    .then((response) => {
      this.getAllSongs();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getSpotifyToken() {
    axios.get(`/tokens`)
    .then((response) => {
      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;
      if (access_token) {
        spotifyApi.setAccessToken(access_token);
        this.setState({userType: 'host'});
      }
    })
    .then((response) => {
      if (this.state.userType === 'host') {
        this.getDeviceId();
      }
    })
    .then((response) =>{
      if (this.state.userType === 'host') {
        this.getHostInfo();
      }
    })
    .catch((err) => {
      console.error.bind(err);
    })
  }
  //Should generate a random party code that will refer to the current session for host/users
  generatePartyCode() {
    //generateRandomString(7) after export - Steve
  }

  //get the active device for the host user who is signed in to Spotify
  getDeviceId() {
    spotifyApi.getMyDevices()
      .then((data) => {
        this.setState({deviceId : data.devices[0].id});
      }, (err) =>{
        console.error(err);
      });
  }

  getHostInfo() {
    axios.get('/hostInfo')
    .then((response) => {
      this.setState({currentUser : response.data.id});
    })
  }

  playCurrentSong(deviceId, trackId, duration) {
    spotifyApi.play({
      device_id: deviceId,
      uris: ['spotify:track:' + trackId]
    });
    if (this.state.interval) {
      clearInterval(this.state.interval);
    }
    var interval = setTimeout(this.songEnded.bind(this), duration);
    this.setState({interval: interval});
  };

  songEnded() {
    this.handlePlayButtonClick();
  }

  createNewPlaylist() {
    axios.post('/createNewPlaylist', {
      params: { 
        currentUser: this.state.currentUser,
        name: 'myNewPlaylist',
        public: true
      }
    })
    .then((response) => {
      console.log("Making a new Playlist", response);
      console.log("ID Number:", response.location)
  //     this.setState({currentPlaylist: response.id}) //need to pull the playlist ID
    })
  }

  getExistingPlaylists() {
    axios.get('/hostPlaylists')
    .then((response) => {
      console.log(response.data.items);
      this.setState({playlists: response.data.items});
    })
  }

  // Should GET songs from selected Spotify playlist, to be rendered on Playlist via PlaylistEntry
  getPlaylistSongs() {
    console.log('before ajax', this.state.currentPlaylist);
    axios.get('/playlistSongs', {
      params: { 
        currentUser: this.state.currentUser,
        currentPlaylist: this.state.currentPlaylist
      }
    })
    .then((response) => {
      // console.log("Playlist Songs: ", response.data.items);
      this.setState({songs: response.data.items})
      this.getCurrentSong();
    })
  }

  handlePlayButtonClick () {
    const trackId = this.state.songs[0].link.split('track/')[1];
    const songId = this.state.songs[0]._id;
    this.setState({currentSong: this.state.songs[0]});
    this.playCurrentSong(this.state.deviceId, trackId, this.state.songs[0].duration_ms);
    this.removeSong(songId);
  }

  joinAsGuest () {
    this.setState({userType: 'guest'});
    console.log('Joining as Guest');
    // this.getAllSongs();
    this.getPlaylistSongs();
  }

  removeSong(songId) {
    axios.delete('/song', {params: {id: songId}})
    .then((response) => {
      this.getAllSongs();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleCurrentPlaylistClick(playlist) {
    console.log("Clicked PlaylistID:", playlist.id);
    this.setState({currentPlaylist: playlist.id}, () => {
      this.getPlaylistSongs();
    });

  }

  switchToGuest() {
    this.getCurrentSong();
    this.setState({userType: 'guest'})
  }

  switchToHost() {
    this.getCurrentSong();
    this.setState({userType: 'host'})
  }

  render() {
    var toBeRendered = () => {
      if (this.state.userType === null) {
        return (<StartParty joinAsGuest={this.joinAsGuest}/>);
      }
      if (this.state.userType === 'host') {
        return (
          <div>
              <div>
              <span className="switchUserType" onClick={this.switchToGuest}>Switch to Guest Mode</span>
              </div>
            <h2>HI {this.state.currentUser}!! Your Party Code: {this.state.partyCode}</h2>

            { !this.state.songs && <div><button onClick={this.createNewPlaylist}>Start a New Playlist</button></div>}
            { !this.state.songs && <div><button onClick={this.getExistingPlaylists}>Choose an Existing Playlist</button></div>}

            {this.state.currentUser && this.state.currentPlaylist && 
            <div className='hostPlayer'>
              <PlayerHost currentUser={this.state.currentUser} currentPlaylist={this.state.currentPlaylist}/>
            </div>
            }
            <div className='playlistList'>
              { this.state.playlists && <PlaylistSelector playlists={this.state.playlists} handleCurrentPlaylistClick={this.handleCurrentPlaylistClick} />}
            </div>

            { this.state.songs && <Playlist songs={this.state.songs} upVote={this.upVote} downVote={this.downVote} handlePlayButtonClick={this.handlePlayButtonClick}/> }
          </div>
        );
      }

      if (this.state.userType === 'guest') {
        return (
          <div>
              <div>
              <span className="switchUserType" onClick={this.switchToHost}>Switch to Host Mode</span>
              </div>
            <div className='playerGuest'>
              { this.state.currentSong && <PlayerGuest trackId={this.state.currentSong}/>}
            </div>
            <div className='playlistSongs'>
              { this.state.songs && <Playlist currentSong={this.state.currentSong} songs={this.state.songs} upVote={this.upVote} downVote={this.downVote} handlePlayButtonClick={this.handlePlayButtonClick} /> }

            </div>
          </div>
        )
      }
    }
      return (
        <div>
        {toBeRendered()}
        </div>
      )
  }
}


export default Party;


            // { this.state.songs && <div className='playButtonStyle'><button onClick={this.handlePlayButtonClick}>Play top song</button></div> }
            // { this.state.currentSong && <PlayerGuest trackId={this.state.currentSong.link.split('track/')[1]}/>}
