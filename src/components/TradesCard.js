import React from "react";
import { Card,  Row, Col, Button } from "react-bootstrap";

const TradesCard = ({ title, trades }) => {
  return (

        <Card className="mb-3 p-2 shadow-md">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                {trades.map((trade, index) => (
                <Card className="p-1 mb-3">
                <div key={index} className="d-flex justify-content-between align-items-center ">

                <div className="mb-3">
                    <img
                    src={"https://github.com/CongoBeast/SpaceShare/blob/main/src/pages/profile-download.jpg?raw=true"} // Replace with actual profile image URL
                    alt={`${trade.name}'s profile`}
                    className="rounded-circle"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                </div>

                    <div>
                    <strong>{trade.name}</strong> <br />
                    <small className="text-grey">{trade.date}</small>
                    </div>
                    <div>
                    <span
                        className={`badge ${
                        trade.status === "Profit" ? "bg-success" : trade.status === "Loss" ? "bg-danger" : "bg-secondary"
                        }`}
                    >
                        {trade.amount}
                    </span>
                    </div>
                    <Button variant="outline-secondary" size="sm">
                    <i className="bi bi-pencil-fill"></i>
                    </Button>
                </div>
                </Card>
                ))}
            </Card.Body>
        </Card>

  );
};

export default TradesCard;
