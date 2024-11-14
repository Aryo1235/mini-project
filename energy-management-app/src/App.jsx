import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Flowbite } from "flowbite-react";
import EnergyList from "./pages/EnergyList";
import AddEnergyForm from "./components/AddEnergyForm";
import EditEnergyForm from "./components/EditEnergyForm";
import EnergyDetail from "./components/EnergyDetail";
import LandingPage from "./pages/LandingPage";
import Navbars from "./components/Navbar";
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
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}></Route>
        </Routes>
      </Router>
    </Flowbite>
  );
}

export default App;
