import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewTradeModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    symbol: "C300", // Default symbol
    tradeType: "Short", // Default trade type
    riskAmount: "",
    riskToReward: "",
    positions: "",
    date: new Date().toISOString().slice(0, 16), // Default to current date and time
    status: "Pending", // Automatically set to "Pending"
    outcome: "0"
  });

  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateTradeId = () => {
    // Generate a unique trade ID by combining symbol, trade type, and timestamp
    const timestamp = new Date().getTime(); // Current timestamp
    const { symbol, tradeType } = formData;
    return `${symbol}-${tradeType}-${timestamp}`;
  };

  const handleSubmit = async () => {
    setLoading(true); // Start loading

    try {
      // Retrieve user ID from local storage
      const userId = localStorage.getItem("user");

      // Generate a unique trade ID
      const tradeId = generateTradeId();

      // Prepare the payload
      const payload = {
        ...formData,
        tradeId, // Include the generated trade ID
        userId, // Include the user ID
      };

      // Send a POST request to the submit-trade route
      const response = await fetch("http://localhost:3005/submit-trade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit trade");
      }

      // Handle successful submission
      toast.success("Trade submitted successfully!"); // Show success toast
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error submitting trade:", error);
      toast.error("Failed to submit trade. Please try again."); // Show error toast
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Trade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Symbol</Form.Label>
              <Form.Select name="symbol" value={formData.symbol} onChange={handleChange}>
                <option value="C300">C300</option>
                <option value="C500">C500</option>
                <option value="C1K">C1K</option>
                <option value="B300">B300</option>
                <option value="B500">B500</option>
                <option value="B1K">B1K</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Trade Type</Form.Label>
              <Form.Select name="tradeType" value={formData.tradeType} onChange={handleChange}>
                <option value="Long">Long</option>
                <option value="Short">Short</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Risk Amount</Form.Label>
              <Form.Control
                type="number"
                name="riskAmount"
                value={formData.riskAmount}
                onChange={handleChange}
                placeholder="Enter risk amount"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Risk to Reward</Form.Label>
              <Form.Control
                type="number"
                name="riskToReward"
                value={formData.riskToReward}
                onChange={handleChange}
                placeholder="Enter risk to reward ratio"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Number of Positions</Form.Label>
              <Form.Control
                type="number"
                name="positions"
                value={formData.positions}
                onChange={handleChange}
                placeholder="Enter number of positions"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date and Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Save Trade"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </>
  );
};

export default NewTradeModal;