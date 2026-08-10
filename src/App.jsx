import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Register from './pages/Register';
import JdAnalysis from './pages/JdAnalysis';
import VersionHistory from './pages/VersionHistory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resumes/:resumeId/analyze" element={<JdAnalysis />} />
        <Route path="/resumes/:resumeId/versions" element={<VersionHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;