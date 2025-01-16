import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import TradesCard from "../components/TradesCard";
import NewTradeModal from "../components/NewTradeModal";
import NoteMistakeModal from "../components/NoteMistakeModal";

const HomePage = () => {
  const [showNewTrade, setShowNewTrade] = useState(false);
  const [showNoteMistake, setShowNoteMistake] = useState(false);

  const todayTrades = [
    { name: "Boom 1k", date: "24 Dec 2024 20:30", amount: "$40", status: "Active" },
    { name: "Boom 500", date: "24 Dec 2024 19:33", amount: "-$34", status: "Loss" },
    { name: "Crash 500", date: "24 Dec 2024 19:33", amount: "+$53", status: "Profit" },
  ];

  const yesterdayTrades = [
    { name: "Boom 1k", date: "23 Dec 2024 20:30", amount: "$40", status: "Active" },
    { name: "Boom 500", date: "23 Dec 2024 19:33", amount: "-$34", status: "Loss" },
    { name: "Crash 500", date: "23 Dec 2024 19:33", amount: "+$53", status: "Profit" },
  ];

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="p-4" style={{ width: "100%" }}>
        <h2>Consistency is Key</h2>
        <div className="d-flex mb-3">
          <button className="btn btn-primary me-2" onClick={() => setShowNewTrade(true)}>
            + New Trade
          </button>
          <button className="btn btn-danger" onClick={() => setShowNoteMistake(true)}>
            + Note Mistake
          </button>
        </div>
        {/* <TradesCard title="Today's Trades" trades={todayTrades} />
        <TradesCard title="Yesterday's Trades" trades={yesterdayTrades} /> */}
        <div className="mt-4">
            <div className="row">
                <div className="col-md-4">
                    <TradesCard title="Today's Trades" trades={todayTrades} />
                </div>
                <div className="col-md-4 ">
                    <TradesCard title="Yesterday's Trades" trades={yesterdayTrades} customClass="yesterday-card" />
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
