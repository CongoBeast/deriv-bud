import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container , Form} from "react-bootstrap";
import axios from "axios"
import { Pie, Bar, Line, Doughnut } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    ArcElement,
  } from "chart.js";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    ArcElement
  );

const Dashboard = () => {
  const [selectedSymbol, setSelectedSymbol] = useState("C300");

  const [stats , setStats] = useState({})
  const [tradeStats , setTradeStats] = useState({})
  const [loading , setLoading] = useState(true)
  const [error , setError] = useState(null)

  const fetchWeeklyStats = async () => {
    try {
      const response = await axios.get("http://localhost:3005/stats");
      setStats(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching weekly stats:", err);
      setError(err);
      setLoading(false);
    }
  };

  const fetchTradeStats = async () => {
    try {
      const response = await axios.get("http://localhost:3005/trade-stats");
      setTradeStats(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching weekly stats:", err);
      setError(err);
      setLoading(false);
    }
  };


  useEffect(() => {

    fetchWeeklyStats();
    fetchTradeStats();
  }, []);

  console.log(tradeStats)

  const symbolData = {
    labels: ["C1K", "C500", "C300", "B500", "B300" , "B1K"],
    datasets: [
      {
        data: [19, 23.5, 23.5, 14.3, 4.8],
        backgroundColor: ["#4caf50", "#2196f3", "#ff9800", "#f44336", "#9c27b0"],
        hoverBackgroundColor: ["#45a049", "#1976d2", "#fb8c00", "#e53935", "#7b1fa2"],
      },
    ],
  };

  const tradesData = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
      {
        label: "Number of Trades",
        data: {
          C300: [30, 40, 35, 45, 50, 55, 60, 50, 40, 45, 50, 55],
          C500: [25, 30, 28, 35, 38, 40, 45, 40, 30, 35, 40, 45],
          C1K: [20, 25, 22, 30, 32, 35, 40, 38, 28, 33, 37, 42],
          B500: [28, 34, 30, 38, 42, 46, 50, 48, 38, 43, 45, 50],
          B300: [15, 18, 17, 22, 25, 27, 30, 32, 24, 28, 32, 36],
          B1K: [10, 12, 15, 18, 20, 25, 28, 30, 25, 27, 30, 33],
        }[selectedSymbol],
        backgroundColor: "#2196f3",
        hoverBackgroundColor: "#1976d2",
        borderRadius: 8, // Rounded edges for bars
      },
    ],
  };


  const progressData = {
    labels: ["Achieved", "Remaining"],
    datasets: [
      {
        data: [74, 26],
        backgroundColor: ["#4caf50", "#e0e0e0"],
        hoverBackgroundColor: ["#45a049", "#bdbdbd"],
      },
    ],
  };

  const plData = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
      {
        label: "P/L",
        data: {
          C300: [10, 15, 20, 25, 30, 35, 40, 35, 30, 25, 20, 15],
          C500: [5, 10, 15, 20, 25, 30, 35, 40, 30, 35, 40, 45],
          C1K: [12, 18, 22, 27, 30, 32, 37, 35, 30, 33, 35, 40],
          B500: [18, 23, 25, 28, 30, 35, 40, 38, 33, 35, 38, 42],
          B300: [8, 10, 15, 18, 20, 23, 25, 27, 20, 23, 28, 32],
          B1K: [5, 8, 12, 16, 18, 22, 26, 28, 22, 24, 28, 32],
        }[selectedSymbol],
        borderColor: "#03a9f4",
        backgroundColor: "rgba(3, 169, 244, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#03a9f4",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: true, // Ensure tooltips are enabled
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove gridlines
        },
      },
      y: {
        grid: {
          display: false, // Remove gridlines
        },
      },
    },
  };

  return (
    <Container className="mt-3">
      <h2 className="text-center mb-4">My Dashboard</h2>
      <Row className="mb-4">
            <Col md={2}>
                <Card className="text-center shadow-sm m-3" style={{ background: "linear-gradient(45deg, #6a11cb, #2575fc)", color: "white" }}>
                    <Card.Body style={{ padding: "0.2rem" }}>
                        <Card.Title style={{ fontSize: "2.5rem", fontWeight: "bold", color: "white"  }}>
                          {stats.currentMonth?.totalTrades !== undefined ? stats.currentMonth.totalTrades.toFixed(1) : "Loading..."}
                          </Card.Title>
                        <Card.Text style={{ fontSize: "0.9rem" , color: "white" }}>Number of Trades</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={2}>
                <Card className="text-center shadow-sm m-3" style={{ background: "linear-gradient(45deg, #56ab2f, #a8e063)", color: "white" }}>
                    <Card.Body style={{ padding: "0.2rem" }}>
                        <Card.Title style={{ fontSize: "2.5rem", fontWeight: "bold", color: "white"  }}>
                        ${stats.currentMonth?.netPnl !== undefined ? stats.currentMonth.netPnl : "Loading..."}
                        </Card.Title>
                        <Card.Text style={{ fontSize: "0.9rem" , color: "white" }}>P/L</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={2}>
                <Card className="text-center shadow-md m-3" style={{ background: "linear-gradient(45deg, #ff416c, #ff4b2b)", color: "white" }}>
                    <Card.Body style={{ padding: "0.2rem" }}>
                        <Card.Title style={{ fontSize: "2.5rem", fontWeight: "bold", color: "white" }}> 
                          {stats.currentMonth?.winRate !== undefined ? stats.currentMonth.winRate.toFixed(1) + "%" : "Loading..."}
                          </Card.Title>
                        <Card.Text style={{ fontSize: "0.9rem" , color: "white"  }}>Win Rate</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={2}>
                <Card className="text-center shadow-sm m-3" style={{ background: "linear-gradient(45deg, #11998e, #38ef7d)", color: "white" }}>
                    <Card.Body style={{ padding: "0.2rem" }}>
                        <Card.Title style={{ fontSize: "2.5rem", fontWeight: "bold" , color: "white" }}>87%</Card.Title>
                        <Card.Text style={{ fontSize: "0.9rem", color: "white"  }}>Target Pct Progress</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>


    <div>
      <Row className="mb-4">
        <Col md={2} className="mb-4">
          <Form.Select
            value={selectedSymbol}
            onChange={(e) => setSelectedSymbol(e.target.value)}
            aria-label="Filter by symbol"
          >
            <option value="C300">C300</option>
            <option value="C500">C500</option>
            <option value="C1K">C1K</option>
            <option value="B500">B500</option>
            <option value="B300">B300</option>
            <option value="B1K">B1K</option>
          </Form.Select>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-4">
          <h5 className="text-center">Trades Over Time</h5>
          <Bar data={tradesData} options={chartOptions} />
        </Col>
        <Col md={6} className="mb-4">
          <h5 className="text-center">P/L Trend</h5>
          <Line data={plData} options={chartOptions} />
        </Col>
      </Row>
    </div>

      <Row>
        <Col md={3} className="mb-4">
          <h5 className="text-center">Symbol Distribution</h5>
          <Pie data={symbolData} />
        </Col>
        <Col md={3} className="mb-4">
          <h5 className="text-center">Win Rate</h5>
          <Doughnut data={progressData} />
        </Col>

        <Col md={3} className="mb-4">
          <h5 className="text-center">P/L Distribution</h5>
          <Pie data={symbolData} />
        </Col>
        <Col md={3} className="mb-4">
          <h5 className="text-center">Target Progress</h5>
          <Doughnut data={progressData} />
        </Col>
      </Row>

    </Container>
  );
};

export default Dashboard;
