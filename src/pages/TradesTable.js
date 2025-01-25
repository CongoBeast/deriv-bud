import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col, InputGroup, Modal  } from "react-bootstrap";
import Sidebar from "../components/sidebar";
import axios from 'axios';

const fetchTrades = async (filter) => {
  try {
    const response = await axios.get('http://localhost:3005/trades', {
      params: {
        filter: filter, // Pass the filter as a query parameter
      },
    });
    return response.data; // Return the fetched trades
  } catch (error) {
    console.error('Error fetching trades:', error);
    throw error; // Handle the error in your component
  }
};


const TradesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    date: "",
    symbol: "",
    type: "",
  });
  const [trades, setTrades] = useState([]);
  const [dateFilter, setDateFilter] = useState(''); // State to manage the filter

  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [selectedTrade, setSelectedTrade] = useState(null); // State to store the selected trade for editing
  const [status, setStatus] = useState(""); // State for the status input
  const [outcome, setOutcome] = useState(""); // State for the outcome input

  const loadTrades = async () => {
    try {
      const data = await fetchTrades(filter);
      setTrades(data); // Update the state with the fetched trades
    } catch (error) {
      console.error('Failed to load trades:', error);
    }
  };

  // Filtered and Searched Trades
  const filteredTrades = trades.filter((trade) => {
    const matchesSearch = trade.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = filter.date ? trade.date === filter.date : true;
    const matchesSymbol = filter.symbol ? trade.symbol === filter.symbol : true;
    const matchesType = filter.type ? trade.tradeType === filter.tradeType : true;

    return matchesSearch && matchesDate && matchesSymbol && matchesType;
  });

    // Open the modal and set the selected trade
  const handleEditClick = (trade) => {
      setSelectedTrade(trade);
      setStatus(trade.status);
      setOutcome(trade.outcome || "");
      setShowModal(true);
    };
  
    // Close the modal
  const handleCloseModal = () => {
      setShowModal(false);
      setSelectedTrade(null);
      setStatus("");
      setOutcome("");
    };


    // Handle form submission
  const handleSaveChanges = async () => {
      if (!selectedTrade) return;
  
      try {
        await axios.put(`http://localhost:3005/edit-trade/${selectedTrade._id}`, {
          status,
          amount: outcome,
        });
        loadTrades(); // Refresh the trades after updating
        handleCloseModal(); // Close the modal
      } catch (error) {
        console.error('Error updating trade:', error);
      }
    };

  useEffect(() => {
    loadTrades();
  }, [filter]);

  return (
    <div className="p-4">
      <h2 className="mb-4">All My Trades</h2>

      {/* Search Bar */}
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search trades by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="outline-secondary">Search</Button>
      </InputGroup>

      {/* Filters */}
      <Row className="mb-3">
        <Col md={3}>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={filter.date}
              onChange={(e) => setFilter({ ...filter, date: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Symbol</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter symbol"
              value={filter.symbol}
              onChange={(e) => setFilter({ ...filter, symbol: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Form.Select
              value={filter.type}
              onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            >
              <option value="">All</option>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3} className="d-flex align-items-end">
          <Button
            variant="outline-danger"
            onClick={() => setFilter({ date: "", symbol: "", type: "" })}
          >
            Reset Filters
          </Button>
        </Col>
      </Row>

      {/* Trades Table */}
      <Table striped bordered hover responsive className="table-modern">
        <thead>
          <tr>
            <th>#</th>
            <th>Symbol</th>
            <th>Type</th>
            <th>Date</th>
            <th>Status</th>
            <th>Risk Amount</th>
            <th>Outcome</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrades.map((trade, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{trade.symbol}</td>
              <td>{trade.tradeType}</td>
              <td>{trade.date}</td>
              <td>
                <span
                  className={`badge ${
                    trade.status === "Profit"
                      ? "bg-success"
                      : trade.status === "Loss"
                      ? "bg-danger"
                      : trade.status === "B/E"
                      ? "bg-primary"
                      : "bg-secondary"
                  }`}
                >
                  {trade.status}
                </span>
              </td>
              <td>{trade.riskAmount}</td>
              <td>{trade.outcome}</td>
              <td>                    
                <Button variant="outline-secondary" className="m-1" disabled={trade.status !== "Pending"} size="sm" onClick={() => handleEditClick(trade)}  >
                  <i className="bi bi-pencil-fill"></i>
                </Button>

                <Button variant="outline-danger" className="m-1" disabled={trade.status !== "Pending"} size="sm" >
                  <i className="bi bi-trash-fill"></i> 
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

            {/* Edit Trade Modal */}
     <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Trade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Profit">Profit</option>
                <option value="Loss">Loss</option>
                <option value="B/E">B/E</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Outcome</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter outcome"
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  );
};

export default TradesTable;
