import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Create from './Create';
import WorkoutDetails from './WorkoutDetail';
import Home from './Home';
import EditItem from './Edit';

function App() {
  return (
<Router>
  <div className="App">
      <Switch>
      <Route exact path='/user/login'>
      <Login/>
      </Route>
      <Route exact path='/user/signup'>
      <Signup/>
      </Route>
      <Route exact path='/workouts/'>
        <Create/>
      </Route>
      <Route path='/workouts/:id'>
        <WorkoutDetails/>
      </Route>
      <Route path='/home'>
        <Home/>
      </Route>
      <Route exact path='/edit'>
        <EditItem/>
      </Route>
     
    </Switch>
  </div>
</Router>
 
  );
}

export default App;
