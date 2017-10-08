import React from 'react';

const PlaylistSelector = (props) => {
  return (
    <div>
      { props.playlists.map((playlist, i) => {
              return (
                <li>{playlist.name}</li>
              )
              })
            }


    </div>
  )
}

export default PlaylistSelector;