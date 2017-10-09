import React from 'react';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-js';
import PlaylistEntry from './PlaylistEntry';
import Player from './Player.js';
import PlaylistSelector from './PlaylistSelector.js';
import StartParty from './StartParty.js';
import FlatButton from 'material-ui/FlatButton';
import sampleData from '../lib/sampleData.js';
import Playlist from './Playlist.js';

const spotifyApi = new SpotifyWebApi();

class Party extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      userType: null,
      partyCode: null,

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
    this.createPlaylist = this.createPlaylist.bind(this);
    this.getExistingPlaylists = this.getExistingPlaylists.bind(this);
    this.songEnded = this.songEnded.bind(this);

  }

  componentDidMount() {
    this.getSpotifyToken();
    //this.getAllSongs();

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
        console.log(response.data);
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

  generatePartyCode() {

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
    console.log('play for duration:', duration);
    if (this.state.interval) {
      clearInterval(this.state.interval);
    }
    var interval = setTimeout(this.songEnded.bind(this), duration);
    this.setState({interval: interval});
  };

  songEnded() {
    console.log('song ended');
    this.handlePlayButtonClick();
  }

  createPlaylist() {
    this.getAllSongs();
  }

  getExistingPlaylists() {
    axios.get('/hostPlaylists')
    .then((response) => {
      console.log(response.data.items);
      this.setState({playlists: response.data.items});
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

  render() {
    var toBeRendered = () => {
      if (this.state.userType === null) {
        return (<StartParty joinAsGuest={this.joinAsGuest}/>);
      }
      if (this.state.userType === 'host') {
        return (
          <div>
              <h2>HI {props.currentUser}!! Your Party Code: {this.state.partyCode}</h2>
              { !this.state.songs && <div><button onClick={this.createPlaylist}>Start a New Playlist</button></div>}
              { !this.state.songs && <div><button onClick={this.getExistingPlaylists}>Choose an Existing Playlist</button></div>}
              { this.state.playlists && <PlaylistSelector playlists={this.state.playlists}/>}
              { this.state.songs && <div className='playButtonStyle'><button onClick={this.handlePlayButtonClick} primary={true}>Play top song</button></div> }
              { this.state.currentSong && <Player trackId={this.state.currentSong.link.split('track/')[1]}/>}
               { this.state.songs && <Playlist songs={this.state.songs}/> }
          </div>
        );
      }
      if (this.state.userType === 'guest') {
        return (
          <div>
            <div className='playerStyle'>
            { props.currentSong && <Player trackId={props.currentSong.link.split('track/')[1]}/>}
            </div>
            { props.songs && <Playlist songs={this.state.songs}/> }
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