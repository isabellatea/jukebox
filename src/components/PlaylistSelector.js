import React from 'react';
import PlaylistSelectorEntry from './PlaylistSelectorEntry';


const PlaylistSelector = (props) => {  
  const handlePlaylistSelection = () => {
    console.log("Hi!!!");
    // this.props.sendSelectedPlaylistToSpotifyPlayer(playlist)
    
  }
  return (
    <div>
      { props.playlists.map((playlist, i) => {
              return (
                <PlaylistSelectorEntry key={i} playlist={playlist} handleCurrentPlaylist={props.handleCurrentPlaylistClick} />
                
              )
              })
            }
    </div>
  )
}


export default PlaylistSelector;