import React from 'react';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-js';
import PlaylistEntry from './PlaylistEntry';
import Player from './Player.js';
import PlaylistPlayer from './PlaylistPlayer.js';
import StartParty from './StartParty.js';
import FlatButton from 'material-ui/FlatButton';
import sampleData from '../lib/sampleData.js';

const spotifyApi = new SpotifyWebApi();

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: sampleData.tracks.items,
      currentSong: '',
      deviceId: '',
      currentUser: '',
      userType: null
    }


    this.getAllSongs = this.getAllSongs.bind(this);
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
    this.joinAsGuest = this.joinAsGuest.bind(this);
    this.getDeviceId = this.getDeviceId.bind(this);
    this.getHostInfo = this.getHostInfo.bind(this);
    this.getSpotifyToken = this.getSpotifyToken.bind(this);

  }

  componentDidMount() {
    this.getSpotifyToken();
    this.getAllSongs();

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
      console.log(response.data);
      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;
      if (access_token) {
        spotifyApi.setAccessToken(access_token);
        this.setState({userType: 'host'});
      }
      console.log('here i am:', this.state.userType);
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

  //get the active device for the host user who is signed in to Spotify
  getDeviceId() {
    console.log('getting device id');
    spotifyApi.getMyDevices()
      .then((data) => {
        this.setState({deviceId : data.devices[0].id});
        console.log('in get device id' + this.state.userType);
      }, (err) =>{
        console.error(err);
      });
  }

  getHostInfo() {
    axios.get('/hostInfo')
    .then((response) => {
      console.log(response.data);
      this.setState({currentUser : response.data.id});
    })
  }

  playCurrentSong(deviceId, trackId) {
    spotifyApi.play({
      device_id: deviceId,
      uris: ['spotify:track:' + trackId]
    });
  };

  handlePlayButtonClick () {
    const trackId = this.state.songs[0].link.split('track/')[1];
    const songId = this.state.songs[0]._id;
    this.setState({currentSong: this.state.songs[0]});
    this.playCurrentSong(this.state.deviceId, trackId);
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
    const playerStyle = {
      display: 'inline-block',
      width: '50%',
      verticalAlign: 'top',
      textAlign: 'center',
      position: 'fixed'
    }
    const playListStyle = {
      display: 'inline-block',
      width:'50%',
      float: 'right'
    }
    const playButtonStyle = {
      width: '100%',
      margin: '16px',
      textAlign: 'center'
    }

    var toBeRendered = () => {
      if (this.state.userType === null) {
        return (<StartParty joinAsGuest={this.joinAsGuest}/>);
      }
      if (this.state.userType === 'host') {
        return (
          <div>
            <h2>HI {this.state.currentUser}!!</h2>
            <div style={playerStyle}> <PlaylistPlayer /></div>
            <div style={playButtonStyle}><FlatButton onClick={this.handlePlayButtonClick} label="Play top song" primary={true} /></div>
            <div style={playListStyle} >
            { this.state.songs && this.state.songs.map((song, i) => {
              return (
                <PlaylistEntry index={i+1} downVote={this.downVote} handlePlay={this.handlePlayButtonClick} upVote={this.upVote} Song={song} key={i} />
              )
              })
            }
            </div>
          </div>

          );
      }
      if (this.state.userType === 'guest') {
        return (
          <div>
            <div style={playerStyle}>
            { this.state.currentSong && <Player trackId={this.state.currentSong.link.split('track/')[1]}/>}
            </div>
            <div style={playListStyle} >
            { this.state.songs && this.state.songs.map((song, i) => {
              return (
                <PlaylistEntry index={i+1} downVote={this.downVote} handlePlay={this.handlePlayButtonClick} upVote={this.upVote} Song={song} key={i} />
                )
              })
            }
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

export default Playlist;