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
  const name = (input) => {
    props.updateGuestName(input.target.value);
  }

  const getName = (function(){
    console.log('userName', userName);
    return userName;
  }).bind(this);

  return (

    <div>
      <div className='searchContainer'>
        <div className='searchTitleArea'>
          <p className='searchTitle'>Add A Song</p>


          {props.userType === 'host' ? '' : <input onChange= {(input) => name(input)} type="text"/>}
          <input onChange= {(input) => query(input)} type="text"/>
          <button className="searchButton" onClick={clickHandler}>Search</button>
        </div>
        <div className='searchAreaResults'>
          { props.searchList && props.searchList.map(
            (result, i) => {
              return (
                <SearchEntry getName={getName} addSongs={props.addSongs} key={i} Result={result}/>
              )
            })
          }
        </div>
      </div>
    </div>

  );

}

export default Search;
