import React, { useState, useEffect } from "react";
import { Card, Row, Col, Spinner, Tab, Tabs, Modal, Button } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import "./SignalsPage.css"; // Optional: Add custom styles

const SignalsPage = () => {
//   const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("today");
  const [showImageModal, setShowImageModal] = useState(false); // State for image modal
  const [selectedImage, setSelectedImage] = useState(""); // State for selected image URL

  // Fetch trade signals from the backend
//   useEffect(() => {
//     const fetchSignals = async () => {
//       try {
//         const response = await axios.get("http://localhost:3005/signals");
//         setSignals(response.data);
//       } catch (error) {
//         console.error("Error fetching signals:", error);
//         setError("Failed to fetch signals. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSignals();
//   }, []);

const signals = [
    {
      "symbol": "BOOM 1000",
      "position": "Buy",
      "entry": "42000",
      "stoploss": "41000",
      "date": "2023-10-25T14:30:00.000Z",
      "imageUrl": "https://github.com/CongoBeast/deriv-bud/blob/main/src/pages/signals-pics/B1K-buy.png?raw=true" // Example image URL
    },
    {
      "symbol": "CRASH 300",
      "position": "Sell",
      "entry": "3000",
      "stoploss": "3100",
      "date": "2023-10-24T10:15:00.000Z",
      "imageUrl": "https://github.com/CongoBeast/deriv-bud/blob/main/src/pages/signals-pics/C300-Sell.png?raw=true" // Example image URL
    }
  ]

  // Filter signals based on the selected tab
  const filterSignals = (tab) => {
    const today = moment().startOf("day");
    const yesterday = moment().subtract(1, "day").startOf("day");
    const twoDaysAgo = moment().subtract(2, "days").startOf("day");

    switch (tab) {
      case "today":
        return signals.filter((signal) =>
          moment(signal.date).isSame(today, "day")
        );
      case "yesterday":
        return signals.filter((signal) =>
          moment(signal.date).isSame(yesterday, "day")
        );
      case "twoDaysAgo":
        return signals.filter((signal) =>
          moment(signal.date).isSame(twoDaysAgo, "day")
        );
      case "later":
        return signals.filter((signal) =>
          moment(signal.date).isBefore(twoDaysAgo, "day")
        );
      default:
        return signals;
    }
  };

  // Handle image click
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-center mb-4">Trade Signals</h1>

      <Button className="mb-3" href="\addsignals">     
            <i className="bi bi-info-circle-fill"></i> Add Signal
        </Button>
      <Tabs
        activeKey={activeTab}
        onSelect={(tab) => setActiveTab(tab)}
        className="mb-4"
      >
        <Tab eventKey="today" title={`Today (${filterSignals("today").length})`}>
          <SignalCards signals={filterSignals("today")} onImageClick={handleImageClick} />
        </Tab>
        <Tab eventKey="yesterday" title={`Yesterday (${filterSignals("yesterday").length})`}>
          <SignalCards signals={filterSignals("yesterday")} onImageClick={handleImageClick} />
        </Tab>
        <Tab eventKey="twoDaysAgo" title={`Two Days Ago (${filterSignals("twoDaysAgo").length})`}>
          <SignalCards signals={filterSignals("twoDaysAgo")} onImageClick={handleImageClick} />
        </Tab>
        <Tab eventKey="later" title={`Later (${filterSignals("later").length})`}>
          <SignalCards signals={filterSignals("later")} onImageClick={handleImageClick} />
        </Tab>
      </Tabs>

      {/* Image Modal */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>View Full Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img src={selectedImage} alt="Full Size" style={{ maxWidth: "100%", height: "auto" }} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// Component to display signal cards
const SignalCards = ({ signals, onImageClick }) => {
  return (
    <Row>
      {signals.map((signal, index) => (
        <Col key={index} md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title className="text-center">{signal.symbol}</Card.Title>
              <Card.Text>
                <strong>Position:</strong> {signal.position}
                <br />
                <strong>Entry:</strong> {signal.entry}
                <br />
                <strong>Stoploss:</strong> {signal.stoploss}
                <br />
                <strong>Date:</strong> {moment(signal.date).format("MMM Do YYYY, h:mm a")}
              </Card.Text>
              {signal.imageUrl && (
                <div className="text-center">
                  <img
                    src={signal.imageUrl}
                    alt="Signal"
                    style={{ width: "100%", cursor: "pointer" }}
                    onClick={() => onImageClick(signal.imageUrl)}
                  />
                  <small>Click to view full image</small>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SignalsPage;