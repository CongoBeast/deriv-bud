import React, { useState } from "react";
import { Form, Button, Card, Alert, InputGroup } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSignalPage = () => {
  const [formData, setFormData] = useState({
    symbol: "C300", // Default symbol
    entry: "",
    stoploss: "",
    target: "",
    image: "", // Store the image URL
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Prepare the trade data
      const tradeData = {
        symbol: formData.symbol,
        entry: formData.entry,
        stoploss: formData.stoploss,
        target: formData.target,
        image: formData.image, // Use the provided image URL
      };

      // Send the trade data to the backend
      const response = await axios.post("https://deriv-bud-backend.onrender.com/submit-signal", tradeData);

      if (response.status === 201) {
        toast.success("Trade signal added successfully!");
        setFormData({
          symbol: "C300",
          entry: "",
          stoploss: "",
          target: "",
          image: "",
        });
      }
    } catch (error) {
      console.error("Error adding trade signal:", error);
      setError("Failed to add trade signal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-center mb-4">Add Trade Signal</h1>
      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {/* Symbol Dropdown */}
            <Form.Group className="mb-3">
              <Form.Label>Symbol</Form.Label>
              <Form.Select
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                required
              >
                <option value="C300">C300</option>
                <option value="C500">C500</option>
                <option value="C1K">C1K</option>
                <option value="B300">B300</option>
                <option value="B500">B500</option>
                <option value="B1K">B1K</option>
              </Form.Select>
            </Form.Group>

            {/* Entry Price */}
            <Form.Group className="mb-3">
              <Form.Label>Entry Price</Form.Label>
              <Form.Control
                type="number"
                name="entry"
                value={formData.entry}
                onChange={handleChange}
                placeholder="Enter entry price"
                required
              />
            </Form.Group>

            {/* Stoploss Price */}
            <Form.Group className="mb-3">
              <Form.Label>Stoploss Price</Form.Label>
              <Form.Control
                type="number"
                name="stoploss"
                value={formData.stoploss}
                onChange={handleChange}
                placeholder="Enter stoploss price"
                required
              />
            </Form.Group>

            {/* Target Price */}
            <Form.Group className="mb-3">
              <Form.Label>Target Price</Form.Label>
              <Form.Control
                type="number"
                name="target"
                value={formData.target}
                onChange={handleChange}
                placeholder="Enter target price"
                required
              />
            </Form.Group>

            {/* Image URL Input */}
            <Form.Group className="mb-3">
              <Form.Label>Trade Image URL</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Paste image URL"
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => navigator.clipboard.readText().then((text) => setFormData({ ...formData, image: text }))}
                >
                  Paste
                </Button>
              </InputGroup>
              <small className="text-muted">Paste the URL of the trade image.</small>
            </Form.Group>

            {/* Error Message */}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Submit Button */}
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Adding Signal..." : "Add Signal"}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Toast Container for Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AddSignalPage;