
import './App.css';
import Home from './Home';
import Signup from './Signup';
import GetWorkouts from './GetWorkouts';
import SignIn from './SignIn';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NewWorkout from './NewWorkout';
import GetByID from './GetByID';
import Update from './Update';
function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
        <Switch>
          <Route exact path = '/'>
            <Home></Home>
          </Route>
          <Route exact path = '/signup'>
            <Signup></Signup>
          </Route>
          <Route path = '/signin'>
            <SignIn></SignIn>
          </Route>
          
          <Route path='/newWorkout'>
            <NewWorkout></NewWorkout>
          </Route>
          <Route path='/getWorkouts'>
            <GetWorkouts></GetWorkouts>
          </Route>
          <Route path='/getbyid/:id'>
            <GetByID></GetByID>
          </Route>
          <Route path = '/update/:id'>
            <Update></Update>
          </Route>

        </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
