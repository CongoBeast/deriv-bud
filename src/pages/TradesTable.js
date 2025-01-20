import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
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

  // const trades = [
  //   { name: "Trade 1", symbol: "AAPL", type: "buy", date: "2025-01-01", status: "Profit", amount: 100 },
  //   { name: "Trade 2", symbol: "TSLA", type: "sell", date: "2025-01-02", status: "Loss", amount: 200 },
  //   { name: "Trade 3", symbol: "GOOGL", type: "buy", date: "2025-01-03", status: "Profit", amount: 150 },
  //   { name: "Trade 4", symbol: "MSFT", type: "sell", date: "2025-01-04", status: "Neutral", amount: 250 },
  // ];

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

  console.log(trades)

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
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrades.map((trade, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{trade.symbol}</td>
              <td>{trade.type}</td>
              <td>{trade.date}</td>
              <td>
                <span
                  className={`badge ${
                    trade.status === "Profit"
                      ? "bg-success"
                      : trade.status === "Loss"
                      ? "bg-danger"
                      : "bg-secondary"
                  }`}
                >
                  {trade.status}
                </span>
              </td>
              <td>{trade.amount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TradesTable;
