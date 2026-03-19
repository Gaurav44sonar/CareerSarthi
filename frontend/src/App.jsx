import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateProfile from "./pages/CreateProfile";
import CareerRecommendations from "./pages/CareerRecommendations";
import SkillGap from "./pages/SkillGap";

function App() {
  return (
    <Router>
      <Routes>

        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* AI Flow */}
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/careers" element={<CareerRecommendations />} />
        <Route path="/skill-gap" element={<SkillGap />} />

      </Routes>
    </Router>
  );
}

export default App;