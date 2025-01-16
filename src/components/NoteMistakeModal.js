import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const NoteMistakeModal = ({ show, handleClose }) => {
  const [mistake, setMistake] = useState("");

  const handleSubmit = () => {
    console.log(mistake);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Note Mistake</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Describe Mistake</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={mistake}
              onChange={(e) => setMistake(e.target.value)}
              placeholder="Describe what went wrong"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleSubmit}>
          Save Mistake
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NoteMistakeModal;
