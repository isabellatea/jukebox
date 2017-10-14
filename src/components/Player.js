import React from 'react';


const Player = (props) => {
  return (
    <div className = "innerSpotifyPlayer">
     <iframe src={'https://open.spotify.com/embed?uri=spotify:track:' + props.trackId} width="90%" height="520px" frameBorder="0" allowTransparency="true"></iframe>
    </div>
  )
}


export default Player;
