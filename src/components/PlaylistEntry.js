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
      <p>Added By: {props.song.userName}</p>
      <p>Image: {props.song.image}</p>
      <p>Downvote Count: {props.song.downVoteCount}<button onClick={handleDownVote}> - </button></p>
      <p>Upvote Count: {props.song.upVoteCount}<button onClick={handleUpVote}> + </button></p>
    </div>
  )
}

export default PlaylistEntry;

