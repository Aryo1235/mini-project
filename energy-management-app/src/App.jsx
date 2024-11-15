import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Flowbite } from "flowbite-react";
import EnergyList from "./pages/EnergyList";
import AddEnergyForm from "./components/AddEnergyForm";
import EditEnergyForm from "./components/EditEnergyForm";
import EnergyDetail from "./pages/EnergyDetail";
import Navbars from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import LoginUser from "./pages/LoginUser";
import ChatBot from "./components/Chat-Bot";

import ProtectedRoute from "./utils/ProtectedRoutes"; // Tambahkan ProtectedRoute
import NavbarsSupa from "./components/NavbarSupa";

function App() {
  return (
    <Flowbite>
      <Router>
        <NavbarsSupa />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginuser" element={<LoginUser />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<EnergyList />} />
            <Route path="/home/:id" element={<EnergyDetail />} />
            <Route path="/add" element={<AddEnergyForm />} />
            <Route path="/edit/:id" element={<EditEnergyForm />} />
            <Route path="/chat" element={<ChatBot />} />
            {/* Route untuk halaman chatai */}
          </Route>

        </Routes>
      </Router>
    </Flowbite>
  );
}

export default App;
