import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import HomePage from "./pages/HomePage";
import TopNavBar from "./components/TopNavBar";
import Sidebar from "./components/sidebar";
import TradesTable from './pages/TradesTable';
import Dashboard from './pages/Dashboard';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


function App() {
  return (

    <Router>

    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid">
      <TopNavBar />

      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/mytrades" element={<TradesTable />} />
         <Route path="/analysis" element={<Dashboard />} />

      </Routes>

      </div>

    </div>

      
    </Router>
  );
}

export default App;
