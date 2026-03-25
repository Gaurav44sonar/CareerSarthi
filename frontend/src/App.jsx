import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateProfile from "./pages/CreateProfile";
import Profile from "./pages/Profile";
import CareerRecommendations from "./pages/CareerRecommendations";
import SkillGap from "./pages/SkillGap";
import Roadmap from "./pages/Roadmap";



function App() {
  return (
    <Router>
      <Routes>

        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />

        {/* AI Flow */}
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/careers" element={<CareerRecommendations />} />
        <Route path="/skill-gap" element={<SkillGap />} />

        <Route path="/roadmap" element={<Roadmap />} />

      </Routes>
    </Router>
  );
}

export default App;