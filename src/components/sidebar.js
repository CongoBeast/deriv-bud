import React from "react";
import { Nav , Button } from "react-bootstrap";
import { FaHome } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="d-flex flex-column p-3 bg-light d-none d-lg-block" style={{ width: "250px", height: "100vh" }}>
      <h2 className="text-primary">DerivBud</h2>
      <Nav className="flex-column">
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
          <Nav.Link href="/trades" className="text-white">
            <i className="bi bi-info-circle-fill"></i> Trades
          </Nav.Link>
        </Button>

        <Button className="mb-3">
          <Nav.Link href="/signals" className="text-white">
            <i className="bi bi-broadcast-pin"></i> Signals
          </Nav.Link>
        </Button>
      </Nav>
    </div>
  );
};

export default Sidebar;
