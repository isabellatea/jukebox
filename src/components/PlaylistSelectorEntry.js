import React from 'react';

const PlaylistSelectorEntry = (props) => {

  const handleCurrentPlaylistClick = () => {
    props.handleCurrentPlaylist(props.playlist);
  }

  return (

    <div>
      <p onClick={handleCurrentPlaylistClick}>Playlist Title: {props.playlist.name} </p>
    </div>
  )
}

export default PlaylistSelectorEntry;

