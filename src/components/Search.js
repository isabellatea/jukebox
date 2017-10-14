import React from 'react';
import SearchEntry from './SearchEntry';

const Search = (props) => {
  var queryString = "";

  const clickHandler = () => {
    props.searchHandler(queryString);
  }
  const query = (input) => {
    queryString = input.target.value;
  }

  return (

    <div>
      <p>Add a Song</p>
      <input onChange= {(input) => query(input)} type="text"/>
      <br />
      <button onClick={clickHandler}>Search</button>
      { props.searchList && props.searchList.map(
        (result, i) => {
          return (
            <SearchEntry addSongs={props.addSongs} key={i} Result={result}/>
          )
        })
      }
    </div>
  );

}

export default Search;
