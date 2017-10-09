import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Party from './Party';
import Signup from './Signup';
import Search from './Search';
// import StartParty from './StartParty';
// import GuestDashboard from './GuestDashboard';
// import HostDashboard from './HostDashboard';
import '../css/styles.css';


class Container extends React.Component {

  render() {
    return (
      <MuiThemeProvider>
        <Switch>
          <Route exact path='/' component={Party} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/search' component={Search} />
        </Switch>
      </MuiThemeProvider>
    )
  }
}
export default Container;

// TODO: Review how react router should be implemented with a node express backend
          // <Route exact path='/host' component={HostDashboard} />
          // <Route exact path='/guest' component={GuestDashboard} />