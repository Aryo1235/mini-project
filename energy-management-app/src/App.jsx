// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import EnergyList from "./components/EnergyList";
import AddEnergyForm from "./components/AddEnergyForm";
import EditEnergyForm from "./components/EditEnergyForm";
import EnergyDetail from "./components/EnergyDetail";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<EnergyList />} />
        <Route path="/:id" element={<EnergyDetail />} />
        <Route path="/add" element={<AddEnergyForm />} />
        <Route path="/edit/:id" element={<EditEnergyForm />} />
      </Routes>
    </Router>
  );
}

export default App;
