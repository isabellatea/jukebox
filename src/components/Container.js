import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Playlist from './Playlist';
import Signup from './Signup';
import Login from './Login';
import Search from './Search';
import Party from './Party';
import '../css/styles.css';


class Container extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Party} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/search' component={Search} />
      </Switch>
    )
  }
}


export default Container;