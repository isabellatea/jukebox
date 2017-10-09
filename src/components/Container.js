import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Party from './Party';
import Signup from './Signup';
import Search from './Search';
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