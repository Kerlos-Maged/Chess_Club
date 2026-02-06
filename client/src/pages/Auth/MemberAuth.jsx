import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { fakeProfiles } from '../../data/fakeData';
import { ChessKnightLoader } from '../../components/Common';

export const MemberAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    grade: '9',
    experience: 'beginner',
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
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

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!registerForm.firstName.trim() || !registerForm.lastName.trim()) {
      setError('First name and last name are required.');
      return;
    }

    if (!registerForm.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (registerForm.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (fakeProfiles.find(p => p.email === registerForm.email)) {
      setError('This email is already registered.');
      return;
    }

    setLoading(true);

    // Simulate registration
    setTimeout(() => {
      const newMember = {
        _id: `user_${Date.now()}`,
        userId: `user_chess_${Date.now()}`,
        firstName: registerForm.firstName,
        lastName: registerForm.lastName,
        email: registerForm.email,
        grade: registerForm.grade,
        experience: registerForm.experience,
        wins: 0,
        losses: 0,
        draws: 0,
        rating: 1200,
        bio: '',
        achievements: [],
        matchHistory: [],
        totalGames: 0,
        winRate: '0',
        joinedDate: new Date(),
        registeredTournaments: [],
      };

      // Save to localStorage
      const existingProfiles = JSON.parse(localStorage.getItem('members') || '[]');
      existingProfiles.push(newMember);
      localStorage.setItem('members', JSON.stringify(existingProfiles));

      // Auto-login after registration
      const token = `member_token_${newMember._id}_${Date.now()}`;
      login(token, newMember, 'member');

      setLoading(false);
      navigate('/competitions');
    }, 800);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy via-blue to-navy flex items-center justify-center">
        <ChessKnightLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-blue to-navy flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gold mb-2">♞ Chess Club</h1>
          <p className="text-lightGray text-sm">Join the community of chess enthusiasts</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Toggle Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-4 font-bold text-center transition ${
                isLogin
                  ? 'bg-blue text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-4 font-bold text-center transition ${
                !isLogin
                  ? 'bg-blue text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-600 rounded">
                <p className="text-red-700 font-bold text-sm">{error}</p>
              </div>
            )}

            {isLogin ? (
              /* Login Form */
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    placeholder="your.email@school.edu"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-transparent"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Try: alex.chen@school.edu</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-transparent"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Demo password: Chess123</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue to-navy text-white font-bold py-3 rounded-lg hover:shadow-lg transition transform hover:scale-105"
                >
                  Login to Your Account
                </button>
              </form>
            ) : (
              /* Register Form */
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold text-navy mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={registerForm.firstName}
                      onChange={handleRegisterChange}
                      placeholder="John"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-navy mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={registerForm.lastName}
                      onChange={handleRegisterChange}
                      placeholder="Doe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                    placeholder="your.email@school.edu"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Grade</label>
                  <select
                    name="grade"
                    value={registerForm.grade}
                    onChange={handleRegisterChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-transparent"
                  >
                    {['9', '10', '11', '12'].map(g => (
                      <option key={g} value={g}>Grade {g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Experience Level</label>
                  <select
                    name="experience"
                    value={registerForm.experience}
                    onChange={handleRegisterChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    placeholder="Minimum 6 characters"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={registerForm.confirmPassword}
                    onChange={handleRegisterChange}
                    placeholder="Re-enter your password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-transparent"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold to-yellow-500 text-navy font-bold py-3 rounded-lg hover:shadow-lg transition transform hover:scale-105"
                >
                  Create Your Account
                </button>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-600">
              {isLogin ? "Don't have an account? " : 'Already registered? '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue font-bold hover:underline"
              >
                {isLogin ? 'Register here' : 'Login here'}
              </button>
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue/10 border border-blue rounded-lg p-4 text-center text-sm text-lightGray">
          <p className="font-bold mb-2">Demo Login Credentials:</p>
          <p>Email: alex.chen@school.edu</p>
          <p>Password: Chess123</p>
        </div>
      </div>
    </div>
  );
};
