import * as React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';  
import './App.css';
import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";
import Header from './components/Header';
import { Home } from './routes/Home';
import RegisterProfil from './routes/RegisterProfil';
import UserConnected from './routes/UserConnected';


function App() {
  
  return (
    <div className="App">
      <React.Fragment>
        <CssBaseline />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<RegisterProfil />} />
          <Route path="user" element={<UserConnected />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
