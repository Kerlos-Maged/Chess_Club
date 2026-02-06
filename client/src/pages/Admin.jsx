import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ChessKnightLoader } from '../components/Common';

export const Admin = () => {
  const navigate = useNavigate();
  const { token, user, login, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Admin dashboard states
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profiles, setProfiles] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [loadingProfiles, setLoadingProfiles] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [matchForm, setMatchForm] = useState({ opponent: '', result: 'win', event: '', notes: '' });
  const [newProfile, setNewProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    grade: '9',
    experience: 'beginner',
  });
  // Tournament management states
  const [showCreateTournament, setShowCreateTournament] = useState(false);
  const [newTournament, setNewTournament] = useState({
    name: '',
    description: '',
    format: 'single-elimination',
    maxParticipants: '8',
    startDate: '',
  });
  const [selectedTournament, setSelectedTournament] = useState(null);

  // Load data when tab changes - MUST be before any early returns
  useEffect(() => {
    if (token && user) {
      if (activeTab === 'players' && profiles.length === 0) {
        fetchProfiles();
      }
      if (activeTab === 'tournaments' && tournaments.length === 0) {
        fetchTournaments();
      }
    }
  }, [activeTab, token, user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (formData.email === 'admin@chess.club' && formData.password === 'Chess@2024') {
        login(fakeAdmin.token, fakeAdmin);
      } else {
        setError('Invalid credentials. Try: admin@chess.club / Chess@2024');
      }
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const fetchProfiles = async () => {
    setLoadingProfiles(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      setProfiles([...fakeProfiles]);
    } catch (err) {
      setError('Failed to load profiles');
    } finally {
      setLoadingProfiles(false);
    }
  };

  const fetchTournaments = async () => {
    setLoadingProfiles(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const saved = localStorage.getItem('tournaments');
      if (saved) {
        setTournaments(JSON.parse(saved));
      } else {
        setTournaments([]);
      }
    } catch (err) {
      setError('Failed to load tournaments');
    } finally {
      setLoadingProfiles(false);
    }
  };

  const handleCreateTournament = async (e) => {
    e.preventDefault();
    try {
      const tournament = {
        _id: Date.now().toString(),
        name: newTournament.name,
        description: newTournament.description,
        format: newTournament.format,
        maxParticipants: parseInt(newTournament.maxParticipants),
        startDate: new Date(newTournament.startDate),
        participants: [],
        rounds: [],
        status: 'upcoming',
        winner: null,
      };

      const updated = [...tournaments, tournament];
      setTournaments(updated);
      localStorage.setItem('tournaments', JSON.stringify(updated));
      setShowCreateTournament(false);
      setNewTournament({ name: '', description: '', format: 'single-elimination', maxParticipants: '8', startDate: '' });
      setError(null);
    } catch (err) {
      setError('Failed to create tournament');
    }
  };

  const handleDeleteTournament = (id) => {
    const updated = tournaments.filter(t => t._id !== id);
    setTournaments(updated);
    localStorage.setItem('tournaments', JSON.stringify(updated));
    setSelectedTournament(null);
  };

  const handleAddParticipant = (tournamentId, participant) => {
    const updated = tournaments.map(t => {
      if (t._id === tournamentId && (t.participants || []).length < t.maxParticipants) {
        return {
          ...t,
          participants: [...(t.participants || []), participant],
        };
      }
      return t;
    });
    setTournaments(updated);
    localStorage.setItem('tournaments', JSON.stringify(updated));
  };

  const handleRemoveParticipant = (tournamentId, participantId) => {
    const updated = tournaments.map(t => {
      if (t._id === tournamentId) {
        return {
          ...t,
          participants: (t.participants || []).filter(p => p._id !== participantId),
        };
      }
      return t;
    });
    setTournaments(updated);
    localStorage.setItem('tournaments', JSON.stringify(updated));
  };

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    try {
      const profile = {
        _id: Date.now().toString(),
        userId: `user_${Date.now()}`,
        ...newProfile,
        wins: 0,
        losses: 0,
        draws: 0,
        rating: 1600,
        winRate: '0.00',
        totalGames: 0,
        matchHistory: [],
        achievements: [],
        joinedDate: new Date(),
      };
      setProfiles([...profiles, profile]);
      setNewProfile({ firstName: '', lastName: '', email: '', grade: '9', experience: 'beginner' });
      alert('Profile created successfully!');
    } catch (err) {
      setError('Failed to create profile');
    }
  };

  const handleAddMatch = async (e) => {
    e.preventDefault();
    if (!selectedProfile) return;

    try {
      const updatedProfiles = profiles.map(p => {
        if (p._id === selectedProfile._id) {
          const newMatch = {
            opponent: matchForm.opponent,
            result: matchForm.result,
            event: matchForm.event,
            notes: matchForm.notes,
            createdAt: new Date(),
          };

          const updatedProfile = { ...p };
          updatedProfile.matchHistory.push(newMatch);

          if (matchForm.result === 'win') {
            updatedProfile.wins += 1;
            updatedProfile.rating += 5;
          } else if (matchForm.result === 'loss') {
            updatedProfile.losses += 1;
            updatedProfile.rating = Math.max(updatedProfile.rating - 5, 0);
          } else if (matchForm.result === 'draw') {
            updatedProfile.draws += 1;
          }

          updatedProfile.totalGames = updatedProfile.wins + updatedProfile.losses + updatedProfile.draws;
          updatedProfile.winRate = updatedProfile.totalGames === 0 ? '0.00' : ((updatedProfile.wins / updatedProfile.totalGames) * 100).toFixed(2);

          setSelectedProfile(updatedProfile);
          return updatedProfile;
        }
        return p;
      });

      setProfiles(updatedProfiles);
      setMatchForm({ opponent: '', result: 'win', event: '', notes: '' });
      alert('Match result added successfully!');
    } catch (err) {
      setError('Failed to add match result');
    }
  };

  const deleteProfile = (profileId) => {
    setProfiles(profiles.filter(p => p._id !== profileId));
    alert('Profile deleted successfully!');
  };

  // Login Page
  if (!token || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-200">
            <h1 className="text-4xl font-bold text-navy mb-2 text-center">Admin Portal</h1>
            <p className="text-center text-gray-600 mb-8">Chess Club Management System</p>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-navy font-bold mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@chess.club"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                />
              </div>

              <div>
                <label className="block text-navy font-bold mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue text-white font-bold py-3 rounded-lg hover:bg-navy transition disabled:opacity-50 text-lg"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue/10 rounded-lg">
              <p className="text-sm text-gray-600 mb-2 font-semibold">Demo Credentials:</p>
              <p className="text-sm text-gray-700">Email: admin@chess.club</p>
              <p className="text-sm text-gray-700">Password: Chess@2024</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'players', label: 'Manage Players' },
    { id: 'tournaments', label: 'Tournaments' },
    { id: 'statistics', label: 'Statistics' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex pt-16 md:pt-20 px-4 md:px-6">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-navy to-blue text-white shadow-xl">
        <div className="p-6 border-b border-white/20">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-blue-100 text-sm mt-1">Chess Club Management</p>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition ${
                activeTab === item.id
                  ? 'bg-gold text-navy shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/10 border-t border-white/20 w-64">
          <div className="bg-white/10 rounded-lg p-3 mb-3">
            <p className="text-sm text-blue-100">Logged in as:</p>
            <p className="text-white font-bold truncate">{user.email}</p>
          </div>
          <button
            onClick={logout}
            className="w-full bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-3xl font-bold text-navy mb-8">Dashboard Overview</h2>
              
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-md p-6 border-l-4 border-blue-600">
                  <p className="text-gray-400 text-sm mb-2">Total Players</p>
                  <p className="text-4xl font-bold text-blue-400">{profiles.length}</p>
                  <p className="text-gray-500 text-xs mt-2">Active members</p>
                </div>

                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-md p-6 border-l-4 border-amber-500">
                  <p className="text-gray-400 text-sm mb-2">Tournaments</p>
                  <p className="text-4xl font-bold text-amber-400">{tournaments.length}</p>
                  <p className="text-gray-500 text-xs mt-2">Total events</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                  <p className="text-gray-600 text-sm mb-2">Total Matches</p>
                  <p className="text-4xl font-bold text-green-600">
                    {profiles.reduce((sum, p) => sum + p.totalGames, 0)}
                  </p>
                  <p className="text-gray-500 text-xs mt-2">Played</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
                  <p className="text-gray-600 text-sm mb-2">System Status</p>
                  <p className="text-lg font-bold text-green-600">Operational</p>
                  <p className="text-gray-500 text-xs mt-2">All systems normal</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-navy mb-4">Welcome to Admin Dashboard</h3>
                <p className="text-gray-600 mb-4">
                  Use the sidebar navigation to manage players, tournaments, and view statistics. All changes are automatically saved.
                </p>
                <div className="bg-blue/10 border border-blue/20 rounded-lg p-4">
                  <p className="text-sm text-navy font-semibold">Quick Tips:</p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• Manage Players: Add new members and track their progress</li>
                    <li>• Tournaments: Create and manage chess competitions</li>
                    <li>• Statistics: View detailed analytics and reports</li>
                    <li>• Settings: Configure system preferences</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Players Management Tab */}
          {activeTab === 'players' && (
            <div>
              <h2 className="text-3xl font-bold text-navy mb-8">Player Management</h2>

              {/* Create New Player */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold text-navy mb-4">Add New Player</h3>
                <form onSubmit={handleCreateProfile} className="grid md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={newProfile.firstName}
                    onChange={(e) => setNewProfile({ ...newProfile, firstName: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={newProfile.lastName}
                    onChange={(e) => setNewProfile({ ...newProfile, lastName: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newProfile.email}
                    onChange={(e) => setNewProfile({ ...newProfile, email: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                  />
                  <select
                    value={newProfile.grade}
                    onChange={(e) => setNewProfile({ ...newProfile, grade: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                  >
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                  <select
                    value={newProfile.experience}
                    onChange={(e) => setNewProfile({ ...newProfile, experience: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                  <button
                    type="submit"
                    className="bg-blue text-white font-bold py-2 rounded-lg hover:bg-navy transition"
                  >
                    Add Player
                  </button>
                </form>
              </div>

              {/* Players List */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-navy to-blue text-white">
                        <th className="px-6 py-4 text-left font-bold">Name</th>
                        <th className="px-6 py-4 text-left font-bold">Email</th>
                        <th className="px-6 py-4 text-center font-bold">Wins</th>
                        <th className="px-6 py-4 text-center font-bold">Losses</th>
                        <th className="px-6 py-4 text-center font-bold">Win Rate</th>
                        <th className="px-6 py-4 text-center font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loadingProfiles ? (
                        <tr>
                          <td colSpan="6" className="px-6 py-12 text-center">
                            <ChessKnightLoader size="md" text="Loading players..." />
                          </td>
                        </tr>
                      ) : profiles.length > 0 ? (
                        profiles.map(profile => (
                          <tr key={profile._id} className="border-b hover:bg-gray-50 transition">
                            <td className="px-6 py-4 font-bold text-navy">
                              {profile.firstName} {profile.lastName}
                            </td>
                            <td className="px-6 py-4 text-gray-600">{profile.email}</td>
                            <td className="px-6 py-4 text-center">
                              <span className="inline-block bg-green-100 text-green-700 font-bold px-3 py-1 rounded">
                                {profile.wins}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="inline-block bg-red-100 text-red-700 font-bold px-3 py-1 rounded">
                                {profile.losses}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center font-bold text-blue">
                              {profile.winRate}%
                            </td>
                            <td className="px-6 py-4 text-center space-x-2">
                              <button
                                onClick={() => setSelectedProfile(profile)}
                                className="bg-blue text-white px-3 py-1 rounded hover:bg-navy transition text-sm"
                              >
                                View
                              </button>
                              <button
                                onClick={() => deleteProfile(profile._id)}
                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                            No players found. Create one to get started!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tournaments Tab */}
          {activeTab === 'tournaments' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-navy">Tournament Management</h2>
                <button
                  onClick={() => setShowCreateTournament(!showCreateTournament)}
                  className="bg-gold text-navy font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition"
                >
                  {showCreateTournament ? '✕ Cancel' : '+ Create Tournament'}
                </button>
              </div>

              {/* Create Tournament Form */}
              {showCreateTournament && (
                <div className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-gold">
                  <h3 className="text-xl font-bold text-navy mb-4">Create New Tournament</h3>
                  <form onSubmit={handleCreateTournament} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-navy mb-2">Tournament Name</label>
                      <input
                        type="text"
                        value={newTournament.name}
                        onChange={(e) => setNewTournament({...newTournament, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue"
                        placeholder="e.g., Spring Championship"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-navy mb-2">Description</label>
                      <textarea
                        value={newTournament.description}
                        onChange={(e) => setNewTournament({...newTournament, description: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue"
                        placeholder="Tournament details..."
                        rows="3"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-navy mb-2">Format</label>
                        <select
                          value={newTournament.format}
                          onChange={(e) => setNewTournament({...newTournament, format: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue"
                        >
                          <option value="single-elimination">Single Elimination</option>
                          <option value="round-robin">Round Robin</option>
                          <option value="swiss">Swiss</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-navy mb-2">Max Participants</label>
                        <input
                          type="number"
                          value={newTournament.maxParticipants}
                          onChange={(e) => setNewTournament({...newTournament, maxParticipants: e.target.value})}
                          min="2"
                          max="64"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-navy mb-2">Start Date</label>
                      <input
                        type="date"
                        value={newTournament.startDate}
                        onChange={(e) => setNewTournament({...newTournament, startDate: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue text-white font-bold py-2 rounded-lg hover:bg-navy transition"
                    >
                      Create Tournament
                    </button>
                  </form>
                </div>
              )}

              {/* Tournaments List */}
              <div className="space-y-4">
                {tournaments.length > 0 ? (
                  tournaments.map(tournament => (
                    <div key={tournament._id} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-navy">{tournament.name}</h4>
                          <p className="text-gray-600 text-sm mt-1">{tournament.description}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-4 py-2 rounded-full font-bold text-sm mb-2 ${
                            tournament.status === 'completed' ? 'bg-green-100 text-green-800' :
                            tournament.status === 'in-progress' ? 'bg-blue/20 text-blue' :
                            'bg-gold/20 text-gold'
                          }`}>
                            {tournament.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4 text-sm border-y border-gray-200 py-3">
                        <div>
                          <span className="text-gray-600">Format:</span>
                          <p className="font-bold capitalize">{tournament.format.replace('-', ' ')}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Participants:</span>
                          <p className="font-bold">{(tournament.participants || []).length}/{tournament.maxParticipants}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Start Date:</span>
                          <p className="font-bold">{tournament.startDate instanceof Date ? tournament.startDate.toLocaleDateString() : new Date(tournament.startDate).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {/* Participants */}
                      {(tournament.participants || []).length > 0 && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm font-bold text-navy mb-2">Participants:</p>
                          <div className="flex flex-wrap gap-2">
                            {(tournament.participants || []).map(p => (
                              <div key={p._id} className="flex items-center gap-2 bg-white px-3 py-1 rounded-full text-sm border border-gray-300">
                                <span>{p.firstName} {p.lastName}</span>
                                {tournament.status === 'upcoming' && (
                                  <button
                                    onClick={() => handleRemoveParticipant(tournament._id, p._id)}
                                    className="text-red-600 hover:text-red-800 font-bold"
                                  >
                                    ✕
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Add Participants */}
                      {tournament.status === 'upcoming' && (tournament.participants || []).length < tournament.maxParticipants && (
                        <div className="mb-4">
                          <select
                            onChange={(e) => {
                              const participant = profiles.find(p => p._id === e.target.value);
                              if (participant) {
                                handleAddParticipant(tournament._id, participant);
                                e.target.value = '';
                              }
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                          >
                            <option value="">+ Add Participant</option>
                            {profiles.filter(p => !(tournament.participants || []).find(tp => tp._id === p._id)).map(p => (
                              <option key={p._id} value={p._id}>
                                {p.firstName} {p.lastName} (Rating: {p.rating})
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 pt-3 border-t border-gray-200">
                        {tournament.status === 'upcoming' && (tournament.participants || []).length >= 2 && (
                          <button
                            onClick={() => {
                              const updated = tournaments.map(t => 
                                t._id === tournament._id ? {...t, status: 'registration'} : t
                              );
                              setTournaments(updated);
                              localStorage.setItem('tournaments', JSON.stringify(updated));
                            }}
                            className="flex-1 bg-blue text-white font-bold py-2 rounded-lg hover:bg-navy transition text-sm"
                          >
                            Open Registration
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteTournament(tournament._id)}
                          className="flex-1 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <p className="text-gray-600 text-lg">No tournaments created yet</p>
                    <p className="text-gray-500 text-sm mt-2">Click "Create Tournament" to get started</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Statistics Tab */}
          {activeTab === 'statistics' && (
            <div>
              <h2 className="text-3xl font-bold text-navy mb-8">System Statistics</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-navy mb-4">Player Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Players:</span>
                      <span className="font-bold">{profiles.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Win Rate:</span>
                      <span className="font-bold">
                        {profiles.length > 0
                          ? (profiles.reduce((sum, p) => sum + parseFloat(p.winRate), 0) / profiles.length).toFixed(2)
                          : '0'}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Matches Played:</span>
                      <span className="font-bold">
                        {profiles.reduce((sum, p) => sum + p.totalGames, 0)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-navy mb-4">Tournament Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Tournaments:</span>
                      <span className="font-bold">{tournaments.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active:</span>
                      <span className="font-bold">
                        {tournaments.filter(t => t.status === 'in-progress').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed:</span>
                      <span className="font-bold">
                        {tournaments.filter(t => t.status === 'completed').length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-3xl font-bold text-navy mb-8">System Settings</h2>

              <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-navy mb-4">Account Information</h3>
                  <div className="space-y-3 text-gray-600">
                    <p>Admin Email: <span className="font-bold">{user.email}</span></p>
                    <p>Role: <span className="font-bold">System Administrator</span></p>
                    <p>Status: <span className="font-bold text-green-600">Active</span></p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold text-navy mb-4">System Preferences</h3>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="ml-3 text-gray-600">Email notifications for new registrations</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="ml-3 text-gray-600">Automatic backup of player data</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="ml-3 text-gray-600">Enable activity logs</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Player Detail Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="bg-gradient-to-r from-navy to-blue text-white p-6 flex justify-between items-center sticky top-0">
              <h2 className="text-2xl font-bold">
                {selectedProfile.firstName} {selectedProfile.lastName}
              </h2>
              <button
                onClick={() => setSelectedProfile(null)}
                className="text-2xl hover:text-gold transition"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Email</p>
                  <p className="font-bold text-navy">{selectedProfile.email}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Experience Level</p>
                  <p className="font-bold text-navy capitalize">{selectedProfile.experience}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-green-100 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">{selectedProfile.wins}</p>
                  <p className="text-sm text-gray-600">Wins</p>
                </div>
                <div className="bg-red-100 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-red-600">{selectedProfile.losses}</p>
                  <p className="text-sm text-gray-600">Losses</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-600">{selectedProfile.draws}</p>
                  <p className="text-sm text-gray-600">Draws</p>
                </div>
                <div className="bg-blue-100 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-blue">{selectedProfile.winRate}%</p>
                  <p className="text-sm text-gray-600">Win Rate</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-navy mb-3">Add Match Result</h3>
                <form onSubmit={handleAddMatch} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Opponent Name"
                    value={matchForm.opponent}
                    onChange={(e) => setMatchForm({ ...matchForm, opponent: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                  />
                  <select
                    value={matchForm.result}
                    onChange={(e) => setMatchForm({ ...matchForm, result: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                  >
                    <option value="win">Win</option>
                    <option value="loss">Loss</option>
                    <option value="draw">Draw</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Event Name"
                    value={matchForm.event}
                    onChange={(e) => setMatchForm({ ...matchForm, event: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                  />
                  <textarea
                    placeholder="Notes (optional)"
                    value={matchForm.notes}
                    onChange={(e) => setMatchForm({ ...matchForm, notes: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                    rows="3"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue text-white font-bold py-2 rounded-lg hover:bg-navy transition"
                  >
                    Add Match
                  </button>
                </form>
              </div>

              <div>
                <h3 className="font-bold text-navy mb-3">Recent Matches</h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {selectedProfile.matchHistory?.length > 0 ? (
                    selectedProfile.matchHistory.slice(-5).reverse().map((match, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-lg text-sm">
                        <p className="font-bold">vs {match.opponent}</p>
                        <p className="text-gray-600">{match.event}</p>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-bold mt-1 ${
                          match.result === 'win' ? 'bg-green-100 text-green-700' :
                          match.result === 'loss' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {match.result.toUpperCase()}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No match history</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
