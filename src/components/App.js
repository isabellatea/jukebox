import React from 'react';
import Header from './Header';
import Container from './Container';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = (props) => {
  return (
    <div>
      <MuiThemeProvider>
      <Header />
      </MuiThemeProvider>
      <Container />
    </div>
  );
}
export default App;