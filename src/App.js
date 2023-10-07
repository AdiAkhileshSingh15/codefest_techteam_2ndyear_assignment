import './App.css';
import Home from './home.js'
import Navbar from './navbar.js'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import About from './About.js'
import Userlogin from './UserLogin';
import UserDetails from './userDetails';
import AddBlogs from './addblogs';
function App() {
  
  return (
    <Router>
      <div className="App">
        <Navbar/>
        
          <Switch>
            <Route exact path='/'>
              <Home/>
            </Route>
            <Route exact path="/About">
              <About/>
            </Route>
            <Route exact path="/user">
              <Userlogin  />
            </Route>
            <Route exact path="/user/addblogs/:id/:username">
              <AddBlogs />
            </Route>
            <Route path="/user/:id/:username">
              <UserDetails />
            </Route>
            
          </Switch>
      </div>
    </Router>
  );
}

export default App;
