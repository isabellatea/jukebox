import React from 'react';

const PlaylistSelector = (props) => {
  return (
    <div>
<iframe src={'https://open.spotify.com/embed?uri=spotify:track:' + props.trackId} width="300" height="380" frameBorder="0" allowTransparency="true"></iframe>


    </div>
  )
}

export default PlaylistSelector;