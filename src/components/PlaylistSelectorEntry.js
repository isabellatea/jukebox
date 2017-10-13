import React from 'react';


const PlaylistSelectorEntry = (props) => {
  const handleCurrentPlaylistClick = () => {
    props.handleCurrentPlaylist(props.playlist);
  }

  return (
    <div className='playlistSelectorEntry'>
      <p onClick={handleCurrentPlaylistClick}>{props.playlist.name} </p>
    </div>
  )
}


export default PlaylistSelectorEntry;

