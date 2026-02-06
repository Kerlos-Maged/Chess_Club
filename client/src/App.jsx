import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { AuthProvider, AuthContext } from './context/AuthContext';
import { Navbar, Footer } from './components/Layout';
import { Loader } from './components/Common';
import { Admin } from './pages/Admin';
import { MemberAuth } from './pages/Auth/MemberAuth';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Join } from './pages/Join';
import { Leaderboard } from './pages/Leaderboard';
import { Competitions } from './pages/Competitions';
import { CompetitionsMinimalAcademic } from './pages/Competitions_MinimalAcademic';
import { CompetitionsChessboardCalendar } from './pages/Competitions_ChessboardCalendar';

import './styles/globals.css';
import './styles/chessAnimations.css';

// Route transition tracker component
function RouteTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [location]);

  if (isTransitioning) {
    return (
      <div className="fixed top-28 left-0 right-0 bottom-0 z-40 bg-slate-950 flex items-center justify-center pointer-events-auto">
        <Loader />
      </div>
    );
  }

  return null;
}

function AppContent() {
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const isAdminPage = window.location.pathname === '/admin';
  const isMemberAuthPage = window.location.pathname === '/member-auth';

  useEffect(() => {
    // Initial page load
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
        <>
          <div className="flex flex-col min-h-screen">
            <RouteTransition />
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/competitions" element={<Competitions />} />
                <Route path="/competitions/minimal-academic" element={<CompetitionsMinimalAcademic />} />
                <Route path="/competitions/chessboard-calendar" element={<CompetitionsChessboardCalendar />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/join" element={<Join />} />
                <Route path="/member-auth" element={<MemberAuth />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </>
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
