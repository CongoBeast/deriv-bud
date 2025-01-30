import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import HomePage from "./pages/HomePage";
import TopNavBar from "./components/TopNavBar";
import Sidebar from "./components/sidebar";
import TradesTable from './pages/TradesTable';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import SignalsPage from './pages/SignalsPage';
import AddSignalPage from './pages/AddSignalsPage';
import { toast, ToastContainer } from "react-toastify";


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
         <Route path="/auth" element={<AuthPage />} />
         <Route path="/signals" element={<SignalsPage />} />
         <Route path="/addsignals" element={<AddSignalPage />} />


      </Routes>

      </div>

    </div>


    <ToastContainer position="top-right" autoClose={3000} />

      
    </Router>
  );
}

export default App;
