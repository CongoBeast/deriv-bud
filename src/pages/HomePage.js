import React, { useState , useEffect} from "react";
import { toast, ToastContainer } from "react-toastify";
import Sidebar from "../components/sidebar";
import TradesCard from "../components/TradesCard";
import NewTradeModal from "../components/NewTradeModal";
import NoteMistakeModal from "../components/NoteMistakeModal";
import '../components/TradesCard.css';
import EditTradeModal from "../components/EditTradeModal";

const HomePage = () => {
  const [showNewTrade, setShowNewTrade] = useState(false);
  const [showNoteMistake, setShowNoteMistake] = useState(false);
  const [todayTrades, setTodayTrades] = useState([]);
  const [yesterdayTrades, setYesterdayTrades] = useState([]);
  const [dayBeforeTrades, setDayBeforeTrades] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showEditTradeModal, setShowEditTradeModal] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);

    // Function to handle editing a trade
  const handleEditTrade = (trade) => {
      // console.log(trade)
      setSelectedTrade(trade); // Set the selected trade
      setShowEditTradeModal(true); // Show the modal
      loadTrades();
    };
  
    // Function to close the modal
  const handleCloseEditTradeModal = () => {
      setShowEditTradeModal(false);
      setSelectedTrade(null); // Reset the selected trade
      loadTrades();
    };


    // Function to fetch trades from the backend
    const fetchTrades = async (filter) => {

      try {
        const response = await fetch(`http://localhost:3005/trades?filter=${filter}`);
        if (!response.ok) {
          throw new Error("Failed to fetch trades");
        }
        const data = await response.json();

        return data;
      } catch (error) {
        console.error("Error fetching trades:", error);
        return [];
      }
    };

    const loadTrades = async () => {
      setLoading(true);
      const today = await fetchTrades("today");
      const yesterday = await fetchTrades("yesterday");
      const dayBefore = await fetchTrades("dayBefore");
      setTodayTrades(today);
      setYesterdayTrades(yesterday);
      setDayBeforeTrades(dayBefore);
      setLoading(false);
    };
  
    // Fetch trades for all filters when the component mounts
    useEffect(() => {
      // const loadTrades = async () => {
      //   setLoading(true);
      //   const today = await fetchTrades("today");
      //   const yesterday = await fetchTrades("yesterday");
      //   const dayBefore = await fetchTrades("dayBefore");
      //   setTodayTrades(today);
      //   setYesterdayTrades(yesterday);
      //   setDayBeforeTrades(dayBefore);
      //   setLoading(false);
      // };
  
      loadTrades();
    }, []);

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

        {loading ? (
          <p>Loading trades...</p>
        ) : (
          <div className="mt-4">
            <div className="row">
              <div className="col-md-4">
                <TradesCard title="Today's Trades" trades={todayTrades} onEditTrade={handleEditTrade} />
              </div>
              <div className="col-md-4">
                <TradesCard title="Yesterday's Trades" trades={yesterdayTrades} customClass="yesterday-card" onEditTrade={handleEditTrade}/>
              </div>
              <div className="col-md-4">
                <TradesCard title="2 Days Ago's Trades" trades={dayBeforeTrades} customClass="yesterday-card" onEditTrade={handleEditTrade} />
              </div>
            </div>
          </div>
        )}




        <NewTradeModal show={showNewTrade} handleClose={() => setShowNewTrade(false)} />
        <NoteMistakeModal show={showNoteMistake} handleClose={() => setShowNoteMistake(false)} />


        <EditTradeModal
          show={showEditTradeModal}
          handleClose={handleCloseEditTradeModal}
          trade={selectedTrade} // Pass the selected trade
        />

      </div>
    </div>



  );
};

export default HomePage;
