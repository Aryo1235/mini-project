// src/App.js

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EnergyList from "./pages/EnergyList";
import AddEnergyForm from "./components/AddEnergyForm";
import EditEnergyForm from "./components/EditEnergyForm";
import EnergyDetail from "./components/EnergyDetail";
import Navbars from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbars />
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
