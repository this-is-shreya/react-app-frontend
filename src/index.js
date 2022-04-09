import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import Signup from "./components/basics/signup"
import Login from "./components/basics/login"
import Homepage from './components/basics/homepage';
import Notfound from './components/basics/notfound'
import "./components/basics/style.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="home/:name" element={<Homepage />} />
          <Route path="*" element={<Notfound />} />
          
      
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
