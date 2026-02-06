import React from 'react';
import { Link } from 'react-router-dom';
import { ChessLogo } from './ChessLogo';

export const Navbar = () => {
  return (
    <nav className="bg-navy text-white shadow-lg border-b-4 border-gold">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <ChessLogo width={45} height={45} />
          <span className="text-2xl font-bold text-white">Chess Club</span>
        </Link>
        <ul className="flex gap-8 text-sm font-semibold">
          <li>
            <Link to="/" className="hover:text-gold transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gold transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/competitions" className="hover:text-gold transition">
              Competitions
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" className="hover:text-gold transition">
              Leaderboard
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-gold transition">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/join" className="hover:text-gold transition">
              Join Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gold transition">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/admin" className="bg-gold text-navy px-4 py-2 rounded font-bold hover:bg-yellow-400 transition">
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
