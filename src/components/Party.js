import React from 'react';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-js';
import PlaylistEntry from './PlaylistEntry';
// import PlayerGuest from './PlayerGuest.js';
import PlaylistSelector from './PlaylistSelector.js';
import StartParty from './StartParty.js';
import sampleData from '../lib/sampleData.js';
import Playlist from './Playlist.js';
import Player from './Player.js';
import Search from './Search.js';


const spotifyApi = new SpotifyWebApi();
// cool
class Party extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      userType: null,
      partyCode: null,
      songs: null,
      hasSongs: false,
      currentSong: '',
      interval: null,
      deviceId: '',
      playlists: '',
      access_token: null,
      guestName: null,

      searchList:null
    }

    this.getAllSongs = this.getAllSongs.bind(this);
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.joinAsGuest = this.joinAsGuest.bind(this);
    this.getDeviceId = this.getDeviceId.bind(this);
    this.getHostInfo = this.getHostInfo.bind(this);
    this.getSpotifyToken = this.getSpotifyToken.bind(this);
    this.getExistingPlaylists = this.getExistingPlaylists.bind(this);
    this.handleCurrentPlaylistClick = this.handleCurrentPlaylistClick.bind(this);
    this.getPlaylistSongs = this.getPlaylistSongs.bind(this);
    this.getCurrentSong = this.getCurrentSong.bind(this);
    this.generatePartyCode = this.generatePartyCode.bind(this);
    this.addSongs = this.addSongs.bind(this);

    this.songEnded = this.songEnded.bind(this);
    this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
    this.switchToGuest = this.switchToGuest.bind(this);
    this.switchToHost = this.switchToHost.bind(this);

    this.searchHandler = this.searchHandler.bind(this);
    this.updateGuestName = this.updateGuestName.bind(this);
  }

  componentDidMount() {
    if (this.getSpotifyToken()) {
      this.setState({userType: 'host'});
      this.getDeviceId();
      this.getHostInfo();
    }
  }



  getCurrentSong() {
    axios.get('/currentlyPlaying')
    .then((response) => {
      console.log("Currently Track/Song ID:",response.data.item.id);
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
      this.getAllSongs(this.state.partyCode);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  downVote(song) {
    song.vote = -1;
    axios.put('/song', song)
    .then((response) => {
      this.getAllSongs(this.state.partyCode);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getSpotifyToken() {
    var access_token;

    if (this.state.access_token) {
      access_token = this.state.access_token;
    } else {
      const getHashParams = () => {
      let hashParams = {};
      let e, r = /([^&;=]+)=?([^&;]*)/g;
      let q = window.location.hash.substring(1);
      while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
        return hashParams;
      }

      const params = getHashParams();
      access_token = params.access_token;
      const refresh_token = params.refresh_token;
      this.setState({access_token: access_token});
      spotifyApi.setAccessToken(access_token);
    }
    return access_token;
  }
  //Should generate a random party code that will refer to the current session for host/users
  generatePartyCode() {
    var partyCode = this.generateRandomString(7);
    this.setState({partyCode: partyCode});
    axios.post('/party', {
      partyCode: this.state.partyCode,
      partyHost: this.state.currentUser,
      token: this.getSpotifyToken()
    });
  }

    //used for checking state of browser for authentication
  generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
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
    axios.get('/hostInfo', {
      params: {
        access_token: this.getSpotifyToken()
      }
    })
    .then((response) => {
      this.setState({currentUser : response.data.id});
    })
    .then((response) => {
      if(!this.state.partyCode) {
        this.generatePartyCode();
      }
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


  getExistingPlaylists() {
    axios.get('/hostPlaylists', {
      params: { access_token: this.getSpotifyToken()}
    })
    .then((response) => {
      var allPlaylists = response.data.items;
      var userOwnedPlaylists = [];
      for (var i = 0; i < allPlaylists.length ; i++) {
        if (allPlaylists[i].owner.id === this.state.currentUser) {
          userOwnedPlaylists.push(allPlaylists[i]);
        }
      }
      this.setState({playlists: userOwnedPlaylists});
    });
  }

  handleCurrentPlaylistClick(playlist) {
    this.getPlaylistSongs(playlist.id);


  }

  getPlaylistSongs(playlistId) {
    axios.get('/playlistSongs', {
      params: {
        user: this.state.currentUser,
        playlist: playlistId,
        access_token: this.getSpotifyToken()
      }
    })
    .then((response) => {
      //add all songs to database
      var songs = response.data.items;
      this.addSongs(songs);
    })
  }

  addSongs(songs) {
    var addedBy;
    if (this.state.userType === 'host') {
      addedBy = this.state.currentUser;
    } else {
      console.log('name', this.state.guestName);
      if (this.state.guestName) {
        addedBy = this.state.guestName;
      } else {
        addedBy = 'Anonymous'
      }
    }
    axios.post('/songs', {
      songs:songs,
      partyCode: this.state.partyCode,
      userName: addedBy
    })
    .then((response)=> {
     this.getAllSongs(this.state.partyCode);
    })
  }

  getAllSongs(partyCode) {
    axios.get('/songs', {
      params: {
        partyCode: partyCode
      }
    })
    .then((response) => {
      var songs = response.data;
      this.setState({songs : []});
      for (var i = 0 ; i < songs.length; i++) {
        this.state.songs.push(songs[i]);
      }
      if (this.state.songs.length > 0) {
        this.setState({hasSongs: true});
      } else {
        this.setState({hasSongs: false});
      }
    })
    .catch((err) => {
      console.error.bind(err);
    })
  }

  handlePlayButtonClick () {
    const trackId = this.state.songs[0].link.split('track/')[1];
    const songId = this.state.songs[0]._id;
    this.setState({currentSong: this.state.songs[0]});
    this.playCurrentSong(this.state.deviceId, trackId, this.state.songs[0].duration_ms);
    this.removeSong(songId);
  }

  joinAsGuest (partyCode) {
    console.log('joining partyCode', partyCode);
    axios.get('/party', {
      params: {
        partyCode: partyCode
      }
    })
    .then((response) => {
      console.log(response.data);
      var party= response.data;
      if (party) {
        this.setState({partyCode: party.partyCode})
        this.setState({userType: 'guest'});
        this.setState({currentUser: party.partyHost});
        this.setState({access_token: party.token});
        this.getAllSongs(party.partyCode);
      }
    })
  }

  removeSong(songId) {
    axios.delete('/song', {params: {id: songId}})
    .then((response) => {
      this.getAllSongs(this.state.partyCode);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  searchHandler(queryString) {
    axios.get('/songs/search', {
      params: {
        query: queryString,
        access_token: this.getSpotifyToken()
      }
    })
    .then((response) => {
      this.setState({ searchList: response.data.tracks.items});
    })
    .catch((err) => {
      console.error.bind(err);
    })
  }

  switchToGuest() {
    this.getCurrentSong();
    this.setState({userType: 'guest'})
  }

  switchToHost() {
    this.getCurrentSong();
    this.setState({userType: 'host'})
  }

  updateGuestName(name){
    this.setState({guestName: name});
  }

  render() {
    var toBeRendered = () => {
      if (this.state.userType === null) {
        return (<StartParty joinAsGuest={this.joinAsGuest}/>);
      }
      if (this.state.userType === 'host') {
        return (
          <div>
            <div className="infoBarHost">
              <span className="switchUserTypeButton" onClick={this.switchToGuest}>Switch to Guest Mode</span>
              <h2>HI {this.state.currentUser}!! Your Party Code: {this.state.partyCode}</h2>
            </div>

            <div className ='hostPlaylistSelector'>
            { !this.state.hasSongs && <div><span className="hostPlaylistSelectorButton" onClick={this.getExistingPlaylists}>Choose an Existing Playlist</span></div>}
            { !this.state.hasSongs &&
            <div className='playlistListContainer'>
              { this.state.playlists && <PlaylistSelector playlists={this.state.playlists} handleCurrentPlaylistClick={this.handleCurrentPlaylistClick} />}
            </div>
            }
            { !this.state.hasSongs && <Search updateGuestName={this.updateGuestName} userType={this.state.userType} addSongs={this.addSongs} searchList={this.state.searchList} queryHandler={this.queryHandler} searchHandler={this.searchHandler} /> }
            </div>

            <div className='spotifyPlayerContainer'>
              { this.state.currentSong && <Player trackId={this.state.currentSong.link.split('track/')[1]}/>}
              { this.state.hasSongs && <button className='playButton' onClick={this.handlePlayButtonClick}>{!this.state.currentSong ? 'Play Top Song' : 'Play Next Song'}</button> }
              { this.state.hasSongs && <Search userType={this.state.userType} addSongs={this.addSongs} searchList={this.state.searchList} queryHandler={this.queryHandler} searchHandler={this.searchHandler} /> }
            </div>
            <div className='playlistContainer'>
              { this.state.hasSongs && <button onClick={()=>{this.getAllSongs(this.state.partyCode)}}>Refresh</button>}
              { this.state.hasSongs && <Playlist currentSong={this.state.currentSong} songs={this.state.songs} upVote={this.upVote} downVote={this.downVote} /> }
            </div>
          </div>

        );
      }
      if (this.state.userType === 'guest') {
        return (
          <div>
            <div className="infoBarGuest">
              <span className="switchUserTypeButton" onClick={this.switchToHost}>Switch to Host Mode</span>
              <h2>Currently in {this.state.currentUser}'s Party! (Party Code: {this.state.partyCode})</h2>
            </div>

            <div className='currentlyPlayingContainer'>
              <div className='currentlyPlayingInner'>
                <img src="http://i66.tinypic.com/2rp9oih.png" alt="jukebox" /> <br />
                <p> Currently Playing: { this.state.currentSong.name } by {this.state.currentSong.artist} </p>
              </div>
              <Search updateGuestName={this.updateGuestName} userType={this.state.userType} addSongs={this.addSongs} searchList={this.state.searchList} queryHandler={this.queryHandler} searchHandler={this.searchHandler}/>
            </div>

            <div className='playlistContainer'>
              { this.state.hasSongs && <button onClick={()=>{this.getAllSongs(this.state.partyCode)}}>Refresh</button>}
              { this.state.songs && <Playlist songs={this.state.songs} upVote={this.upVote} downVote={this.downVote} /> }
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


export default Party


