import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import Register from './Register';
import Workouts from './All_Workouts';
import CreateWorkout from './Create';
import SingleWorkout from './Workout_by_id';
import Update from './Update';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" exact component={LandingPage} />
        <Route path="/workouts" exact component={Workouts} />
        <Route path="/workouts/create" exact component={CreateWorkout} />
        <Route path="/workouts/:id" exact component={SingleWorkout} />
        <Route path="/workouts/update/:id">
          <Update></Update>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
