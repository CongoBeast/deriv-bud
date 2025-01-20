import React, { useState, useEffect } from "react";
import {Navbar , Nav , Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import './sidebar.css';


const Sidebar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]); // Check login status on location change

  const isLinkActive = (path) => location.pathname === path;

  const handleNavClick = (path) => {
    navigate(path);
  };


  const handleLogout = () => {
    // Remove token from local storage and update state
    const username = localStorage.getItem('user');
  
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    setIsLoggedIn(false);

  
    navigate('/'); // Redirect to home after logout
  };

  console.log(isLoggedIn)


  return (
    <div className="d-flex flex-column bg-light d-none d-lg-block" style={{ width: "250px", height: "100vh" }}>

      <Nav className="flex-column sidebar p-3">

      <Navbar.Brand as={Link} to="/" className="mb-5 mt-5">
        <img src="https://github.com/CongoBeast/deriv-bud/blob/main/src/pages/deriv-bud-logo.png?raw=true" 
        alt="Imat Tech Logo"
          style={{  width: "160px" , height: "80px" }}
          className="d-flex align-items-center"
        />
      </Navbar.Brand>


        <Button className="mb-3">
        <Nav.Link href="/" className="text-white">
          <i className="bi bi-house-door-fill"></i> Home
        </Nav.Link>
        </Button>

        <Button className="mb-3">
          <Nav.Link href="/analysis" className="text-white">
            <i className="bi bi-bar-chart-fill"></i> Analysis
          </Nav.Link>
        </Button>
        
        <Button className="mb-3">
          <Nav.Link href="/mytrades" className="text-white">
            <i className="bi bi-info-circle-fill"></i> Trades
          </Nav.Link>
        </Button>

        <Button className="mb-3">
          <Nav.Link href="/signals" className="text-white">
            <i className="bi bi-broadcast-pin"></i> Signals
          </Nav.Link>
        </Button>

        {!isLoggedIn && (
            <>
              <Button
            variant={isLinkActive("/auth") ? "primary" : "outline-light"}
            className="text-left d-flex align-items-center"
            style={{ marginBottom: "1rem" }}
            onClick={() => handleNavClick('/auth')}
          >
            Sign Up
          </Button>
            </>
          )}

        {isLoggedIn && (
            <>
              <Button
                onClick={handleLogout}
                className="text-left d-flex align-items-center mb-3"
                style={{ marginBottom: "1rem" }}
              >
                Logout
              </Button>
            </>
          )}


      </Nav>
    </div>
  );
};

export default Sidebar;
