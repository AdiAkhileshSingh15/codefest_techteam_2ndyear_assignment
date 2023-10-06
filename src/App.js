import Navbar from './Navbar';
import Home from './Home';
import Login from './Login'
import Logout from './Logout'
import Signup from './signup'
import Create from './Create'
import Search from './search';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className='content'>
          <Routes>
            <Route excat path="/" element={<Home />} />
            <Route excat path="/Login" element={<Login />} />
            <Route excat path="/Logout" element={<Logout />} />
            <Route excat path="/Signup" element={<Signup />} />
            <Route excat path="/create" element={<Create />} />
            <Route excat path="/search" element={<Search />} />
        
          </Routes>
        </div>
      </div>
    </Router>
  ); 
}

export default App;
