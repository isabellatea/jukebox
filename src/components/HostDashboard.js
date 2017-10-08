import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { Link } from 'react-router-dom';

const HostDashboard = (props) => {
  return (
  <div>
      <h2>HI {props.currentUser}!! Your Party Code: {props.partyCode}</h2>
      { !props.songs && <div><FlatButton onClick={props.createPlaylist} label="Start a New Playlist"/></div>}
      { !props.songs && <div><FlatButton onClick={props.getExistingPlaylists} label="Choose an Existing Playlist"/></div>}
      { props.playlists && <PlaylistSelector playlists={props.playlists}/>}
      { props.songs && <div style={playButtonStyle}><FlatButton onClick={props.handlePlayButtonClick} label="Play top song" primary={true} /></div> }
      { props.currentSong && <Player trackId={props.currentSong.link.split('track/')[1]}/>}
      <div style={playListStyle} >
      { props.songs && props.songs.map((song, i) => {
        return (
          <PlaylistEntry index={i+1} downVote={props.downVote} handlePlay={props.handlePlayButtonClick} upVote={props.upVote} Song={song} key={i} />
        )
        })
      }
      </div>
   </div>
  )
}

export default HostDashboard;