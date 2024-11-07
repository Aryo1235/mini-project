// src/App.js

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Flowbite } from "flowbite-react"; // Tambahkan impor Flowbite
import EnergyList from "./pages/EnergyList";
import AddEnergyForm from "./components/AddEnergyForm";
import EditEnergyForm from "./components/EditEnergyForm";
import EnergyDetail from "./components/EnergyDetail";
import LandingPage from "./components/LandingPage";
import Navbars from "./components/Navbar";
import Login from "./pages/Login";
import LoginUser from "./pages/LoginUser";

function App() {
  return (
    <Flowbite>
      <Router>
        <Navbars />
        <Routes>
          <Route path="/" element={<EnergyList />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginuser" element={<LoginUser />} />
          <Route path="/:id" element={<EnergyDetail />} />
          <Route path="/add" element={<AddEnergyForm />} />
          <Route path="/edit/:id" element={<EditEnergyForm />} />
        </Routes>
      </Router>
    </Flowbite>
  );
}

export default App;
