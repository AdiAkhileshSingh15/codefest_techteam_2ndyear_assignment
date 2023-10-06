import "./App.css"
import { Routes, Route } from "react-router-dom"
import Register from "./Pages/User/Register"
import Login from "./Pages/User/Login"
import Main from "./Pages/Home/main"
import Navbar from "./components/navbar"
import SecureRoute from "./Helper/SecureRoute"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import SingleProduct from "./Pages/Home/SingleProduct"
function App() {
  return (
    <>
      <div className="App">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
        />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <SecureRoute>
                <Main />
              </SecureRoute>
            }
          />
          <Route path="/workout/:id" element={<SingleProduct/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  )
}

export default App
