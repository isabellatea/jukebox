import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import PlaylistEntry from './PlaylistEntry';

import { Link } from 'react-router-dom';
import '../css/styles.css';

const GuestDashboard = (props) => {
  return (
      <div>
        <div className='playerStyle'>
        { props.currentSong && <Player trackId={props.currentSong.link.split('track/')[1]}/>}
        </div>
        <div className='playListStyle' >
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



export default GuestDashboard;