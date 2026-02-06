import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ChessKnightLoader } from '../../components/Common';

// Added a mock data array for fakeProfiles to resolve the ReferenceError
const fakeProfiles = [
  {
    _id: '1',
    email: 'alex.chen@school.edu',
    firstName: 'Alex',
    lastName: 'Chen',
    grade: '11',
    experience: 'intermediate',
  },
  {
    _id: '2',
    email: 'jane.doe@school.edu',
    firstName: 'Jane',
    lastName: 'Doe',
    grade: '12',
    experience: 'advanced',
  },
];

export const MemberAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      const matchedUser = fakeProfiles.find(p => p.email === loginForm.email);

      if (!matchedUser) {
        setError('User not found. Please check your email or register.');
        setLoading(false);
        return;
      }

      // Verify password (in real app, this would be backend verification)
      if (loginForm.password !== 'Chess123') {
        setError('Invalid password. Try "Chess123" for demo.');
        setLoading(false);
        return;
      }

      // Create token and login
      const token = `member_token_${matchedUser._id}_${Date.now()}`;
      login(token, matchedUser, 'member');

      // Redirect to competitions or previous page
      const from = location.state?.from?.pathname || '/competitions';
      navigate(from);
    }, 800);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy via-blue to-navy flex items-center justify-center">
        <ChessKnightLoader />
      </div>
    );
  }

  // Removed the register functionality and updated the design accordingly
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-12 pt-16 md:pt-20">
      <div className="max-w-lg w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-amber-400 mb-2">♞ Chess Club</h1>
          <p className="text-gray-300 text-sm">Join the ultimate chess community</p>
        </div>

        {/* Auth Card */}
        <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {/* Login Form */}
          <div className="p-8">
            {error && (
              <div className="mb-4 p-4 bg-red-500/20 border-l-4 border-red-600 rounded">
                <p className="text-red-300 font-bold text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-amber-400 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  placeholder="your.email@school.edu"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-amber-400 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition transform hover:scale-105"
              >
                Login to Your Account
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="bg-gray-800 px-8 py-4 border-t border-gray-700 text-center">
            <p className="text-xs text-gray-400">
              Need help? Contact us at <a href="mailto:support@chessclub.com" className="text-amber-400 font-bold hover:underline">support@chessclub.com</a>
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-amber-500/10 border border-amber-500 rounded-lg p-4 text-center text-sm text-amber-300">
          <p className="font-bold mb-2">Demo Login Credentials:</p>
          <p>Email: alex.chen@school.edu</p>
          <p>Password: Chess123</p>
        </div>
      </div>
    </div>
  );
};
