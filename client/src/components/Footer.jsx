import React from 'react';
import { Link } from 'react-router-dom';
import { ChessLogo } from './ChessLogo';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white mt-24">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ChessLogo width={40} height={40} />
              <span className="text-2xl font-bold text-white">Chess Club</span>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              Elevate your chess game and join our community of passionate players.
            </p>
            <p className="text-gray-400 text-sm">
              All matches are free to watch. No membership fees required.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-gold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-gold transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/competitions" className="text-gray-300 hover:text-gold transition">
                  Competitions
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-gray-300 hover:text-gold transition">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-gold transition">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-bold text-gold mb-4">Programs</h4>
            <ul className="space-y-3">
              <li>
                <p className="text-gray-300">Beginner Training</p>
              </li>
              <li>
                <p className="text-gray-300">Advanced Training</p>
              </li>
              <li>
                <p className="text-gray-300">Tournaments</p>
              </li>
              <li>
                <p className="text-gray-300">Community Events</p>
              </li>
              <li>
                <p className="text-gray-300">Coaching Sessions</p>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-gold mb-4">Get Started</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/join" className="text-gray-300 hover:text-gold transition">
                  Join Us
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-300 hover:text-gold transition">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-gold transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-300 hover:text-gold transition">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          {/* Stats Row */}
          <div className="grid md:grid-cols-3 gap-8 mb-8 text-center">
            <div>
              <p className="text-gold font-bold text-xl">150+</p>
              <p className="text-gray-400 text-sm">Active Members</p>
            </div>
            <div>
              <p className="text-gold font-bold text-xl">50+</p>
              <p className="text-gray-400 text-sm">Annual Events</p>
            </div>
            <div>
              <p className="text-gold font-bold text-xl">100%</p>
              <p className="text-gray-400 text-sm">Free Access</p>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                Copyright © {currentYear} Chess Club. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-gray-400 hover:text-gold transition text-sm">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-gold transition text-sm">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-gold transition text-sm">
                  Code of Conduct
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Border Accent */}
      <div className="h-1 bg-gradient-to-r from-gold via-blue to-gold"></div>
    </footer>
  );
};
