import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Signup from './Signup'; 
import Login from './Login';
import Myworkouts from './Myworkouts';
import Navbar1 from './Navbar1';
import Create from './create'; 
import Notfound from './Notfound';
import LoginError from './LoginError';
function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route exact path="/">
            <Navbar />
              <Home />
            </Route>
            <Route exact path="/Signup">
            <Navbar />
             <Signup />
            </Route>
            <Route exact path="/Login">
            <Navbar />
              <Login />
            </Route>
            <Route exact path ="/Myworkouts">
            <Navbar1 />
              <Myworkouts />
            </Route>
            <Route exact path ="/create">
              <Navbar />
              <Create />
            </Route>
            <Route exact path ="/LoginError">
              <Navbar />
              <LoginError />
            </Route>
            <Route path="*">
              <Navbar />
              <Notfound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
