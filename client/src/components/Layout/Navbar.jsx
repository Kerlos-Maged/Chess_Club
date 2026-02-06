import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, userType, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  // Navigation links for horizontal layout
  const navLinks = [
    { name: 'Home', path: '/', piece: '♔' },
    { name: 'About', path: '/about', piece: '♕' },
    { name: 'Tournaments', path: '/competitions', piece: '♖' },
    { name: 'Leaderboard', path: '/leaderboard', piece: '♗' },
    { name: 'Members', path: '/member-auth', piece: '♘' },
    { name: 'Donate', path: '#donate', piece: '♥' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 text-white shadow-2xl border-b-4 border-blue-700 opacity-90 backdrop-blur-sm h-28">
      <div className="max-w-full mx-auto px-6 h-full">
        {/* Centered Navigation Layout - All in One Row */}
        <div className="hidden lg:flex items-center justify-center h-full py-0 gap-2 md:gap-4 lg:gap-8 flex-wrap">
          {/* Left Navigation (First 3 items) */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="group relative px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg transition transform duration-300 hover:scale-110 hover:-translate-y-1 text-xs sm:text-sm font-bold flex items-center gap-1 sm:gap-2 text-amber-100 hover:text-white"
              >
                <span className="text-xl group-hover:scale-125 transition">{link.piece}</span>
                <span className="hidden sm:inline">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Center Logo - Flex Layout */}
          <Link 
            to="/" 
            className="flex items-center justify-center hover:scale-110 transition transform duration-300 group flex-shrink-0"
          >
            <img 
              src="/aaaaa.png" 
              alt="October Chess Club OCC Logo" 
              className="w-8 sm:w-12 md:w-16 lg:w-24 xl:w-44 object-contain drop-shadow-lg group-hover:scale-110 transition transform duration-300 rounded-lg"
            />
          </Link>

          {/* Right Navigation (Last 3 items) */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
            {navLinks.slice(3, 6).map((link) => (
              link.path === '#donate' ? (
                <a
                  key={link.path}
                  href={link.path}
                  className="group relative px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg transition transform duration-300 hover:scale-110 hover:-translate-y-1 text-xs sm:text-sm font-bold flex items-center gap-1 sm:gap-2 text-green-400 hover:text-green-300"
                >
                  <span className="text-xl group-hover:scale-125 transition">{link.piece}</span>
                  <span className="hidden sm:inline">{link.name}</span>
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className="group relative px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg transition transform duration-300 hover:scale-110 hover:-translate-y-1 text-xs sm:text-sm font-bold flex items-center gap-1 sm:gap-2 text-amber-100 hover:text-white"
                >
                  <span className="text-xl group-hover:scale-125 transition">{link.piece}</span>
                  <span className="hidden sm:inline">{link.name}</span>
                </Link>
              )
            ))}
          </div>
        </div>

        {/* Mobile Top Bar */}
        <div className="lg:hidden flex justify-between items-center h-full border-b border-blue-700/30">
          {/* Left Logo (Mobile) */}
          <Link 
            to="/" 
            className="flex items-center hover:scale-110 transition transform duration-300 group"
          >
            <img 
              src="/aaaaa.png" 
              alt="October Chess Club OCC Logo" 
              className="w-24 object-contain drop-shadow-lg rounded"
            />
          </Link>

          {/* Right Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col gap-1.5 p-2 hover:bg-white/10 rounded-lg transition group"
          >
            <span className={`h-1 w-5 bg-blue-600 rounded transition transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''} group-hover:w-6`}></span>
            <span className={`h-1 w-5 bg-blue-600 rounded transition ${isMenuOpen ? 'opacity-0' : ''} group-hover:w-6`}></span>
            <span className={`h-1 w-5 bg-blue-600 rounded transition transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''} group-hover:w-6`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t-2 bg-blue-700  animate-fade-in-down">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="space-y-4">
              {navLinks.map((link) => (
                link.path === '#donate' ? (
                  <a
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-4 px-4 py-3 bg-gradient-to-r from-green-700 to-green-800 rounded-lg text-white hover:text-green-100 hover:from-green-600 hover:to-green-700 transition transform hover:scale-105 border border-green-600"
                  >
                    <span className="text-2xl">{link.piece}</span>
                    <span className="font-bold">{link.name}</span>
                  </a>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-4 px-4 py-3 bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg text-blue-100 hover:text-white hover:from-blue-800 hover:to-blue-700 transition transform hover:scale-105 border border-blue-700"
                  >
                    <span className="text-2xl">{link.piece}</span>
                    <span className="font-bold">{link.name}</span>
                  </Link>
                )
              ))}
            </div>

            {/* Mobile Logout Section */}
            {user && userType === 'member' && (
              <div className="border-t border-blue-700/30 pt-4 mt-6 space-y-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-lg font-bold">
                  <span className="text-lg">♛</span>
                  <span>{user.firstName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 bg-gradient-to-r from-red-900 to-red-800 text-white font-bold rounded-lg hover:from-red-800 hover:to-red-700 transition border border-red-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
