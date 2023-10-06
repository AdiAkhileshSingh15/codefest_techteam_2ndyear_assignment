import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./Pages/Home"
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";


function App() {
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' Component={Home}></Route>
            <Route path='/signup' Component={Signup}></Route>
            <Route path='/login' Component={Login}></Route>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
