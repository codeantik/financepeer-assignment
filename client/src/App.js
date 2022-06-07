import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/header';
import Home from './components/home';
import Register from './components/register';
import Login from './components/login';
import Upload from './components/upload';

const deployedLink = 'https://react-image-uploader.herokuapp.com/';
const localLink = 'http://localhost:5000';

export const config = {
  baseUrl: process.env.NODE_ENV === 'development' ? localLink : deployedLink,
};

console.log(process.env)



function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  // console.log(loggedIn);

  return (
    <div className="App">
      <Router>
        {loggedIn && <Header setLoggedIn={setLoggedIn}/>}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
            />
        <Routes>
          <Route 
            path="/" 
            element={loggedIn ? 
              <Home setLoggedIn={setLoggedIn} loggedIn={loggedIn} /> : 
              <Navigate to="/login" replace />
            }         
          />
          <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="*" element={<h1>404 Not Found!</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
