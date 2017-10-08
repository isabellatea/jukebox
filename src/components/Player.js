import React from 'react';

const Player = (props) => {
  return (
    <div>
     <iframe src={'https://open.spotify.com/embed?uri=spotify:track:' + props.trackId} width="300" height="380" frameBorder="0" allowTransparency="true"></iframe>

    </div>
  )
}

export default Player;

    // <iframe src="https://open.spotify.com/embed/track/6nCKD9aZUCu4gzZ25MzB5n" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
    // <iframe src="https://open.spotify.com/embed/user/ctnswb/playlist/0gAuaZOyYUAJwixutSCCPl" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
