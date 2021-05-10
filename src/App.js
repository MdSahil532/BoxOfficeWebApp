import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDizzy } from '@fortawesome/free-regular-svg-icons';
import Home from './pages/Home';
import Starred from './pages/Starred';
import Show from './pages/Show';
import { AboutProcess } from './components/styled';

const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/starred">
          <Starred />
        </Route>
        <Route exact path="/show/:id">
          <Show />
        </Route>
        <Route>
          <AboutProcess>
            <FontAwesomeIcon className="iconSty" icon={faDizzy} />
            <span>Page not found</span>
          </AboutProcess>
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
