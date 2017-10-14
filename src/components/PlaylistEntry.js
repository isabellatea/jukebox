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
      <img src={props.song.image} />
      <div className='votesSection'>
        <span className='playlistEntryVotes'>Votes: {props.song.netVoteCount}</span>
        <button className='playlistEntryButton' onClick={handleUpVote}> + </button>
        <button className='playlistEntryButton'onClick={handleDownVote}> - </button>
      </div>
      <span className='playlistEntrySong'>{props.song.name}</span> by {props.song.artist}<br />
      <span className='playlistEntryAddedBy'>Added By: {props.song.userName}</span>
    </div>
  );
}


export default PlaylistEntry;