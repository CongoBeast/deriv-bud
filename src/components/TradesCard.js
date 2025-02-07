import React , { useState } from "react";
import { Card,  Row, Col, Button, Badge } from "react-bootstrap";
import './TradesCard.css';
import EditTradeModal from "./EditTradeModal";
import { PiLadderSimple } from "react-icons/pi";

const TradesCard = ({ title, trades , classText , onEditTrade }) => {


    const classVariable = classText + " " + "mb-3 p-2 shadow-md"

    // console.log(classVariable)
      // Calculate P/L for the trades
  const calculatePL = (trades) => {
    return trades.reduce((total, trade) => {
      return total + (parseFloat(trade.outcome) || 0);
    }, 0);
  };

  const pl = calculatePL(trades);

  return (

        <Card className={classVariable}>
            <Card.Body style={{ maxHeight: "700px", overflowY: "auto" }}>
                <Card.Title><h2>{title}</h2></Card.Title>

                <span>Daily P/L :  {pl} </span>
                {trades.map((trade, index) => (
                <Card className="p-1 mb-3">
                <div key={index} className="d-flex justify-content-between align-items-center ">

                <div className="mb-3">
                    <img
                        src={
                        trade.tradeType === "Long"
                            ? "https://github.com/CongoBeast/deriv-bud/blob/main/src/components/trend-up-icon-2048x1228-su3an0tw.png?raw=true" // Replace with the actual "buy" image URL
                            : "https://github.com/CongoBeast/deriv-bud/blob/main/src/components/crash-icon.png?raw=true" // Replace with the actual "sell" image URL
                        }
                        alt={`${trade.name}'s profile`}
                        className="rounded-circle"
                        style={{ width: "70px", height: "50px", objectFit: "fit" }}
                    />
                </div>


                    <div>
                    <strong>{trade.symbol}</strong> <br />
                    <small className="text-grey">{trade.date}</small>
                    </div>
                    <div>
                    {/* <span
                        className={`badge ${
                        trade.status === "Profit" ? "bg-success" : trade.status === "Loss" ? "bg-danger" : "bg-secondary"
                        }`}
                    > */}
                    <span
                    className={`badge ${
                        trade.status === "Profit"
                        ? "bg-success"
                        : trade.status === "Loss"
                        ? "bg-danger"
                        : trade.status === "Pending"
                        ? "bg-primary"
                        : "bg-secondary" // Default fallback (optional)
                    }`}
                    >
                        {trade.status} {trade.status === "Pending" ? ` ($${trade.riskAmount})` : ` $${trade.outcome}`}
                    </span>


                    </div>
                    <Button
                        variant="outline-secondary"
                        disabled={trade.status !== "Pending"} // Disable if status is not "Pending"
                        size="sm"
                        onClick={() => onEditTrade(trade)} // Launch modal for editing
                        >
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
