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

    <div>
      <p>Song Title: {props.song.name} </p>
      <p>Artist: {props.song.artist}</p>
      <p>Added By: {props.song.username}</p>
      <p>Image: {props.song.image}</p>
      <button onClick={handleUpVote}> + </button>
      <button onClick={handleDownVote}> - </button>
      <p>Downvote Count: {props.song.downVoteCount}</p>
      <p>Upvote Count: {props.song.upVoteCount}</p>


    </div>
  )
}

export default PlaylistEntry;

