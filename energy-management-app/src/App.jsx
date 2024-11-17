import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import LandingLayout from "./layouts/LandingLayout";
import HomeLayout from "./layouts/HomeLayout";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginUser from "./pages/LoginUser";
import EnergyList from "./pages/EnergyList";
import AddEnergyForm from "./pages/AddEnergyForm";
import EditEnergyForm from "./pages/EditEnergyForm";
import EnergyDetail from "./pages/EnergyDetail";
import ChatBot from "./pages/Chat-Bot";
import Register from "./pages/RegisterUser";

// Protected Route
import ProtectedRoute from "./Routes/ProtectedRoutes";

// Footer
import SimpleFooter from "./components/Footer";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes untuk Landing Layout */}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginUser />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Routes untuk Home Layout */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomeLayout />}>
            <Route index element={<EnergyList />} />
            <Route path=":id" element={<EnergyDetail />} />
            <Route path="add" element={<AddEnergyForm />} />
            <Route path="edit/:id" element={<EditEnergyForm />} />
            <Route path="chat" element={<ChatBot />} />
          </Route>
        </Route>
      </Routes>
      <SimpleFooter />
    </Router>
  );
}

export default App;
