import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EditTradeModal = ({ show, handleClose, trade }) => {
    const [formData, setFormData] = useState({
      amount: trade?.amount || "", // Default to empty string if amount is missing
      status: trade?.status || "Pending", // Default to "Pending" if status is missing
    });
    const [submitting, setSubmitting] = useState(false); // Loading state
  
    // Handle form input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    // Handle form submission
    const handleSubmit = async () => {
      setSubmitting(true); // Start loading

      console.log(trade)
  
      try {
        // Send a PUT request to update the trade
        const response = await fetch(`http://localhost:3005/edit-trade/${trade._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          throw new Error("Failed to update trade");
        }
  
        const updatedTrade = await response.json();
  
        // Show success toast
        toast.success("Trade updated successfully!");
  
        // Close the modal after a short delay
        setTimeout(() => {
          handleClose();
        }, 1500);
      } catch (error) {
        console.error("Error updating trade:", error);
        toast.error("Failed to update trade. Please try again.");
      } finally {
        setSubmitting(false); // Stop loading
      }
    };
  
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Trade Outcome</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={formData.status} onChange={handleChange}>
                  <option value="Profit">Profit</option>
                  <option value="Loss">Loss</option>
                  <option value="B/E">Break Even (B/E)</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} disabled={submitting}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? (
                <>
                  <Spinner as="span" size="sm" animation="border" role="status" aria-hidden="true" />
                  <span className="ms-2">Submitting...</span>
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </Modal.Footer>
        </Modal>
  
        {/* Toast Container for Notifications */}
        <ToastContainer/>
      </>
    );
  };
  
  export default EditTradeModal;