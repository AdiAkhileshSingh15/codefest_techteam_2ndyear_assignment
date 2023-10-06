import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Logout from './Components/Logout';
import Workouts from './Components/Workout';
import Getall from './Components/Getall';
import Addone from './Components/Addone';
import Getone from './Components/Getone';
import Deleteone from './Components/Deleteone';
import Updateone from './Components/Updateone';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch> 
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/workouts" exact component={Workouts} />
          <Route path="/workouts/getall" exact component={Getall} />
          <Route path="/workouts/addone" exact component={Addone} />
          <Route path="/workouts/getone" exact component={Getone} />
          <Route path="/workouts/deleteone" exact component={Deleteone} />
          <Route path="/workouts/updateone" exact component={Updateone} />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
