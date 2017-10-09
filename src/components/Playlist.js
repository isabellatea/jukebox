import React from 'react';
import PlaylistEntry from './PlaylistEntry';


const Playlist = (props) => {

  return (
      <div>
      <p>SONGS: </p>
      {console.log(props.songs)}
          { props.songs.map((song) => {
              return (
                <PlaylistEntry downVote={props.downVote} handlePlay={props.handlePlayButtonClick} upVote={props.upVote} song={song}/>

              )

            })
          }
      </div>
  );
}

export default Playlist;
