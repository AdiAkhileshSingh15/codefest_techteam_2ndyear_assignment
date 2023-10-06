// App.js

import React from 'react';
import Navbar from './Navbar';
import Home from './Home';
import Loginsignup from './Loginsignup';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Render the Navbar component */}
        <div className="content">
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login" exact>
              <Loginsignup />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
