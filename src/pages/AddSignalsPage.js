import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSignalPage = () => {
  const [formData, setFormData] = useState({
    symbol: "C300", // Default symbol
    entry: "",
    stoploss: "",
    target: "",
    image: null, // Store the uploaded image file
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Upload image to Cloudinary
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", formData.image);
      cloudinaryFormData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary upload preset

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dxxlrzouc/image/upload", // Replace with your Cloudinary cloud name
        cloudinaryFormData
      );

      const imageUrl = cloudinaryResponse.data.secure_url;

      // Prepare the trade data
      const tradeData = {
        symbol: formData.symbol,
        entry: formData.entry,
        stoploss: formData.stoploss,
        target: formData.target,
        image: imageUrl, // Use the Cloudinary image URL
      };

      // Send the trade data to the backend
      const response = await axios.post("http://localhost:3005/submit-signal", tradeData);

      if (response.status === 201) {
        toast.success("Trade signal added successfully!");
        setFormData({
          symbol: "C300",
          entry: "",
          stoploss: "",
          target: "",
          image: null,
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

            {/* Image Upload */}
            <Form.Group className="mb-3">
              <Form.Label>Trade Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              <small className="text-muted">Upload or drag and drop an image.</small>
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