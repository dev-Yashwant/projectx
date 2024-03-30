import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './components/Home.jsx'
import NoMatch from './components/Nomatch.jsx'
// import Navbar from './components/Nar.jsx';
import LoginForm from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Footer from './components/Footer.jsx';

function PrivateRoute() {
  return (
    <div className='relative bg-[#e9e7e7]'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
    
     
  )
}

function Navbar() {
  return <div>This is the Profile page</div>;
}
function Profile() {
  return <div>This is the Profile page</div>;
}

function App() {
  const isAuthenticated = true; // You should replace this with your actual authentication logic
  
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login'element={<LoginForm />}></Route>
        <Route path='/signup'element={<Signup />}></Route>
    </Routes>
  );
}

export default App;
