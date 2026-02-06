import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider, AuthContext } from './context/AuthContext';
import { Navbar, Footer } from './components/Layout';
import { Loader } from './components/Common';
import { Admin } from './pages/Admin';
import { MemberAuth } from './pages/Auth/MemberAuth';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Events } from './pages/Events';
import { Join } from './pages/Join';
import { Leaderboard } from './pages/Leaderboard';
import { Competitions } from './pages/Competitions';
import { CompetitionsMinimalAcademic } from './pages/Competitions_MinimalAcademic';
import { CompetitionsChessboardCalendar } from './pages/Competitions_ChessboardCalendar';

import './styles/globals.css';
import './styles/chessAnimations.css';

function AppContent() {
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const isAdminPage = window.location.pathname === '/admin';
  const isMemberAuthPage = window.location.pathname === '/member-auth';

  useEffect(() => {
    // Simulate loading and then hide loader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {isAdminPage ? (
        <Routes>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      ) : isMemberAuthPage ? (
        <Routes>
          <Route path="/member-auth" element={<MemberAuth />} />
        </Routes>
      ) : (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/competitions" element={<Competitions />} />
              <Route path="/competitions/minimal-academic" element={<CompetitionsMinimalAcademic />} />
              <Route path="/competitions/chessboard-calendar" element={<CompetitionsChessboardCalendar />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/join" element={<Join />} />
              <Route path="/member-auth" element={<MemberAuth />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
