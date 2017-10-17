import React from 'react';


const SearchEntry = (props) => {
  const clickHandler = () => {
    props.addSongs(props.Result);

  }

  return(
    <div className='searchEntry'>
      <img src={props.Result.album.images[2].url} />
      <button className='addSongButton' onClick={clickHandler}> Add </button>
      <span><span className='playlistEntrySongTitle'>{props.Result.name}</span> by {props.Result.artists[0].name} </span><br />
    </div>
  )
}





export default SearchEntry;