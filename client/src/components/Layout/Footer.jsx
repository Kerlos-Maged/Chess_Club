import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 text-white border-t-4 border-blue-600">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-6 md:gap-12 mb-8 md:mb-12">
          {/* Brand Section */}
          <div className="flex flex-col items-start">
            <img 
              src="/aaaaa.png" 
              alt="October Chess Club Logo" 
              className="w-50 h-20 object-contain drop-shadow-lg rounded filter brightness-125"
            />
            <p className="text-gray-300 text-sm mt-4 leading-relaxed">
              Building a thriving chess community at school.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-amber-300 mb-6">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-amber-300 transition text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/competitions" className="text-gray-300 hover:text-amber-300 transition text-sm">
                  Tournaments
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-gray-300 hover:text-amber-300 transition text-sm">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/join" className="text-gray-300 hover:text-amber-300 transition text-sm">
                  Join Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-amber-300 mb-6">Contact Information</h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</p>
                <a href="mailto:chess@school.com" className="text-gray-200 hover:text-amber-300 transition font-medium">
                  chess@school.com
                </a>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Location</p>
                <p className="text-gray-200 font-medium">
                  Room 201, Building A
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Office Hours</p>
                <p className="text-gray-200 font-medium">
                  Tuesday - Thursday: 3:00 - 5:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700">
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6">
            <p className="text-gray-400 text-sm">
              © {currentYear} October Chess Club. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
