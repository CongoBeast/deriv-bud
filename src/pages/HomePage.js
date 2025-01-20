import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import TradesCard from "../components/TradesCard";
import NewTradeModal from "../components/NewTradeModal";
import NoteMistakeModal from "../components/NoteMistakeModal";
import '../components/TradesCard.css';

const HomePage = () => {
  const [showNewTrade, setShowNewTrade] = useState(false);
  const [showNoteMistake, setShowNoteMistake] = useState(false);

  const todayTrades = [
    { name: "Boom 1k", date: "24 Dec 2024 20:30", amount: "$40", status: "Active" , type: "buy"},
    { name: "Boom 500", date: "24 Dec 2024 19:33", amount: "-$34", status: "Loss" , type: "buy"},
    { name: "Crash 500", date: "24 Dec 2024 19:33", amount: "+$53", status: "Profit" , type: "sell"},
  ];

  const yesterdayTrades = [
    { name: "Boom 1k", date: "23 Dec 2024 20:30", amount: "$40", status: "Active" , type: "buy"},
    { name: "Boom 500", date: "23 Dec 2024 19:33", amount: "-$34", status: "Loss" , type: "buy"},
    { name: "Crash 500", date: "23 Dec 2024 19:33", amount: "+$53", status: "Profit" , type: "sell"},
  ];

  return (
    <div className="d-flex">
      {/* <Sidebar /> */}
      <div className="p-4" style={{ width: "100%" }}>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2>Hello  {localStorage.getItem("user")}  Consistency is Key</h2>
        <div className="d-flex justify-content-center mb-3">
          <button className="btn btn-primary me-2" onClick={() => setShowNewTrade(true)}>
            + New Trade
          </button>
          <button className="btn btn-danger" onClick={() => setShowNoteMistake(true)}>
            + Note Mistake
          </button>
        </div>
      </div>
        {/* <TradesCard title="Today's Trades" trades={todayTrades} />
        <TradesCard title="Yesterday's Trades" trades={yesterdayTrades} /> */}
        <div className="mt-4">
            <div className="row">
                <div className="col-md-4">
                    <TradesCard title="Today's Trades" trades={todayTrades} />
                </div>
                <div className="col-md-4 ">
                    <TradesCard title="Yesterday's Trades" trades={yesterdayTrades} classText={"yesterday-card"} customClass="yesterday-card" />
                </div>
                <div className="col-md-4 ">
                    <TradesCard title="2 days ago's Trades" trades={yesterdayTrades} classText={"yesterday-card"} customClass="yesterday-card" />
                </div>
            </div>
        </div>
        <NewTradeModal show={showNewTrade} handleClose={() => setShowNewTrade(false)} />
        <NoteMistakeModal show={showNoteMistake} handleClose={() => setShowNoteMistake(false)} />
      </div>
    </div>



  );
};

export default HomePage;
