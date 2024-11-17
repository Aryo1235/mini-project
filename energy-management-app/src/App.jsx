import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Flowbite } from "flowbite-react";

// Layouts
import LandingLayout from "./layouts/LandingLayout";
import HomeLayout from "./layouts/HomeLayout";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import LoginUser from "./pages/LoginUser";
import EnergyList from "./pages/EnergyList";
import AddEnergyForm from "./pages/AddEnergyForm";
import EditEnergyForm from "./pages/EditEnergyForm";
import EnergyDetail from "./pages/EnergyDetail";
import ChatBot from "./pages/Chat-Bot";

// Protected Route
import ProtectedRoute from "./Routes/ProtectedRoutes";

// Footer
import SimpleFooter from "./components/Footer";

function App() {
  return (
    <Flowbite>
      <Router>
        <Routes>
          {/* Routes untuk Landing Layout */}
          <Route path="/" element={<LandingLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route path="loginuser" element={<LoginUser />} />
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
    </Flowbite>
  );
}

export default App;
