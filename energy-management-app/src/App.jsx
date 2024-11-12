import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Flowbite } from "flowbite-react";
import EnergyList from "./pages/EnergyList";
import AddEnergyForm from "./components/AddEnergyForm";
import EditEnergyForm from "./components/EditEnergyForm";
import EnergyDetail from "./components/EnergyDetail";
import LandingPage from "./components/LandingPage";
import Navbars from "./components/Navbar";
import Login from "./pages/Login";
import LoginUser from "./pages/LoginUser";

import ProtectedRoute from "./utils/ProtectedRoutes"; // Tambahkan ProtectedRoute

function App() {
  return (
    <Flowbite>
      <Router>
        <Navbars />
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

            {/* Route untuk halaman chatai */}
          </Route>
        </Routes>
      </Router>
    </Flowbite>
  );
}

export default App;
