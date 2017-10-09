import React from 'react';

const TestPlayerWithPlaylist = (props) => {
  return (
    <div>
     <iframe src={'https://open.spotify.com/embed/user/' + props.currentUser + '/playlist/' + props.currentPlaylist} width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
    </div>
  )
}

export default TestPlayerWithPlaylist;



//<iframe src="https://open.spotify.com/embed/user/d00dodoo/playlist/4OhSVExXcrrqWm9KU26RJg" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
//{'https://open.spotify.com/embed?uri=spotify:track:' + props.trackId}