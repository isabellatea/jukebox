import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './Navbar';
import Container from './Container';


const App = (props) => {
  return (
    <div>
    <MuiThemeProvider>
      <Navbar />
    </MuiThemeProvider>
    <Container />
  </div>
  );
}
export default App;