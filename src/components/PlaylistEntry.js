import React from 'react';


const PlaylistEntry = (props) => {
  const handleUpVote = () => {
    props.upVote(props.song);
  }

  const handleDownVote = () => {
    props.downVote(props.song);
  }

  const handlePlayButtonClick = () => {
    props.handlePlay(props.song);
  }

  return (
    <div className='playlistEntry'>
      <p>Current Position: {props.position + 1}</p>
      <p>Song Title: {props.song.track.name} </p>
      <p>Artist: {props.song.track.artists[0].name}</p>
      <p>Added By: {props.song.added_by.id}</p>
      <p>Image: {props.song.images}</p> 
      <p>Downvote Count: {props.song.downVoteCount}<button onClick={handleDownVote}> - </button></p>
      <p>Upvote Count: {props.song.upVoteCount}<button onClick={handleUpVote}> + </button></p>
      <hr />
    </div>
  )
}


export default PlaylistEntry;

