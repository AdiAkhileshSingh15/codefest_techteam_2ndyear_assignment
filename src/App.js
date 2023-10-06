import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Logout from "./Components/Logout";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
