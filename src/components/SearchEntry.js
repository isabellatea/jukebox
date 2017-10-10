import React from 'react';


const SearchEntry = (props) => {
  const clickHandler = () => {
    props.onAdd(props.Result);
  }

  return(
    <div>
      <div className='searchImage'>
        <img src={props.Result.image} alt="" />
      </div>
      <div className='searchContent'>
        <p>Name: {props.Result.name}</p>
        <p>Subtitle: {props.Result.artists[0].name}</p>
      </div>
      <button>Add To Playlist</button>
    </div>
  )
}


export default SearchEntry;