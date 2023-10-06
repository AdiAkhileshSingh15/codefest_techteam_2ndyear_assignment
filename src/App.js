import React from 'react';
import NavBar from './Components/navbar';
import Home from './Components/Home';
import About from './Components/About';
import Login from './Components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Workout from './Components/Workout';
import AllWorkouts from './Components/AllWorkouts';
import Workoutdetails from './Components/Workoutdetails';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles'; // Import styled from @mui/material/styles

// Create a styled component
const RootContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const ContentContainer = styled('main')({
  flexGrow: 1,
  padding: (theme) => theme.spacing(3),
});

function App() {
  return (
    <Router>
      <RootContainer>
        <CssBaseline />
        <NavBar />
        <ContentContainer>
          <Container maxWidth="lg">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>

              <Route path="/Navbar">
                <NavBar />
              </Route>

              <Route path="/About">
                <About />
              </Route>

              <Route path="/Login">
                <Login />
              </Route>

              <Route path="/Workout">
                <Workout />
              </Route>

              <Route path="/AllWorkouts">
                <AllWorkouts />
              </Route>

              <Route path="/Workoutdetails/:id">
                <Workoutdetails />
              </Route>
            </Switch>
          </Container>
        </ContentContainer>
      </RootContainer>
    </Router>
  );
}

export default App;
