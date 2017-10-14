import React from 'react';
import SearchEntry from './SearchEntry';

const Search = (props) => {
  return (

    <div>
      <p>Add a Song</p>
      <input onChange= {(input) => props.queryHandler(input.target.value)} type="text" />
      <br />
      <button onClick={props.searchHandler}>Search</button>

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
