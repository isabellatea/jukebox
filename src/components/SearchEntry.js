import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


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