import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Identity from "./Identity";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Create from "./Create";
import Edit from "./Edit";
import { useState } from "react";

function App() {
  // const [token,setToken] =useState("");
  // const locattion_Login={pathname:"/Login",state:{token:token,setToken:setToken}};

  return (
    <Router>
      <div className="App">
        <Identity />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/Register">
            <Register />
          </Route>
          <Route path="/Home">
            <Home />
          </Route>
          <Route path='/Create'>
            <Create />
          </Route>
          <Route path='/Edit'>
            <Edit />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
