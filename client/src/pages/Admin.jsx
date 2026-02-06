import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fakeProfiles, fakeAdmin, fakeTournaments } from '../data/fakeData';
import { AuthContext } from '../context/AuthContext';
import { ChessKnightLoader } from '../components/ChessKnightLoader';

export const Admin = () => {
  const navigate = useNavigate();
  const { token, user, login, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Admin dashboard states
  const [activeTab, setActiveTab] = useState('manage-profiles');
  const [profiles, setProfiles] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [loadingProfiles, setLoadingProfiles] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [matchForm, setMatchForm] = useState({ opponent: '', result: 'win', event: '', notes: '' });
  const [newProfile, setNewProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    grade: '9',
    experience: 'beginner',
  });
  const [newTournament, setNewTournament] = useState({
    name: '',
    description: '',
    maxParticipants: 8,
    startDate: '',
    location: '',
    entryFee: 0,
  });

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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check credentials against fake admin
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

  // Fetch all profiles
  const fetchProfiles = async () => {
    setLoadingProfiles(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      setProfiles([...fakeProfiles]);
    } catch (err) {
      setError('Failed to load profiles');
    } finally {
      setLoadingProfiles(false);
    }
  };

  // Fetch tournaments
  const fetchTournaments = async () => {
    setLoadingProfiles(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const saved = localStorage.getItem('tournaments');
      if (saved) {
        setTournaments(JSON.parse(saved));
      } else {
        setTournaments([
          {
            _id: '1',
            name: 'Spring Championship 2024',
            description: 'Main tournament of the season',
            maxParticipants: 8,
            registeredParticipants: fakeProfiles.slice(0, 3),
            rounds: [],
            currentRound: 0,
            status: 'registration',
            startDate: new Date(Date.now() + 10 * 86400000),
            location: 'School Auditorium',
            entryFee: 10,
            winner: null,
            format: 'single-elimination',
          },
        ]);
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
        _id: String(tournaments.length + 1),
        ...newTournament,
        startDate: new Date(newTournament.startDate),
        registeredParticipants: [],
        rounds: [],
        currentRound: 0,
        status: 'registration',
        winner: null,
        format: 'single-elimination',
      };

      const updated = [...tournaments, tournament];
      setTournaments(updated);
      localStorage.setItem('tournaments', JSON.stringify(updated));
      
      setNewTournament({
        name: '',
        description: '',
        maxParticipants: 8,
        startDate: '',
        location: '',
        entryFee: 0,
      });
      
      alert('Tournament created successfully!');
    } catch (err) {
      setError('Failed to create tournament');
    }
  };

  const handleStartTournament = (tournamentId) => {
    const tournament = tournaments.find(t => t._id === tournamentId);
    if (!tournament || tournament.registeredParticipants.length < 2) {
      alert('Need at least 2 participants to start tournament');
      return;
    }

    const shuffled = [...tournament.registeredParticipants].sort(() => Math.random() - 0.5);
    const rounds = generateRounds(shuffled);

    const updated = tournaments.map(t => {
      if (t._id === tournamentId) {
        return {
          ...t,
          status: 'in-progress',
          rounds,
          currentRound: 1,
        };
      }
      return t;
    });

    setTournaments(updated);
    localStorage.setItem('tournaments', JSON.stringify(updated));
    alert('Tournament started! View it in the Competitions page.');
  };

  const generateRounds = (participants) => {
    if (participants.length === 0) return [];

    const rounds = [];
    const firstRound = {
      roundNumber: 1,
      name: 'Round 1',
      matches: [],
    };

    for (let i = 0; i < participants.length; i += 2) {
      if (i + 1 < participants.length) {
        firstRound.matches.push({
          id: `${Date.now()}-${i}`,
          player1: participants[i],
          player2: participants[i + 1],
          winner: null,
          status: 'pending',
        });
      }
    }
    rounds.push(firstRound);

    let remainingParticipants = firstRound.matches.length;
    let roundNumber = 2;

    while (remainingParticipants > 1) {
      const round = {
        roundNumber,
        name: getRoundName(remainingParticipants),
        matches: [],
      };

      for (let i = 0; i < remainingParticipants; i += 2) {
        if (i + 1 < remainingParticipants) {
          round.matches.push({
            id: `round${roundNumber}-match${i}`,
            player1: null,
            player2: null,
            winner: null,
            status: 'waiting',
          });
        }
      }

      rounds.push(round);
      remainingParticipants = round.matches.length;
      roundNumber++;
    }

    return rounds;
  };

  const getRoundName = (participantCount) => {
    if (participantCount === 2) return 'Final';
    if (participantCount === 4) return 'Semi-Final';
    if (participantCount === 8) return 'Quarter-Final';
    return `Round ${participantCount}`;
  };

  const addTournamentParticipant = (tournamentId, participant) => {
    const updated = tournaments.map(t => {
      if (t._id === tournamentId && t.registeredParticipants.length < t.maxParticipants) {
        return {
          ...t,
          registeredParticipants: [...t.registeredParticipants, participant],
        };
      }
      return t;
    });
    setTournaments(updated);
    localStorage.setItem('tournaments', JSON.stringify(updated));
  };

  const removeTournamentParticipant = (tournamentId, participantId) => {
    const updated = tournaments.map(t => {
      if (t._id === tournamentId) {
        return {
          ...t,
          registeredParticipants: t.registeredParticipants.filter(p => p._id !== participantId),
        };
      }
      return t;
    });
    setTournaments(updated);
    localStorage.setItem('tournaments', JSON.stringify(updated));
  };

  useEffect(() => {
    if (token && activeTab === 'manage-profiles') {
      fetchProfiles();
    } else if (token && activeTab === 'manage-tournaments') {
      fetchTournaments();
    }
  }, [token, activeTab]);

  // Create new profile
  const handleCreateProfile = async (e) => {
    e.preventDefault();
    try {
      const newProfileData = {
        _id: String(fakeProfiles.length + 1),
        userId: `user_chess_${String(fakeProfiles.length + 1).padStart(3, '0')}_${newProfile.firstName.toLowerCase()}`,
        ...newProfile,
        wins: 0,
        losses: 0,
        draws: 0,
        rating: 1200,
        achievements: [],
        matchHistory: [],
        totalGames: 0,
        winRate: '0.00',
        joinedDate: new Date(),
      };

      setProfiles([...profiles, newProfileData]);
      setNewProfile({
        firstName: '',
        lastName: '',
        email: '',
        grade: '9',
        experience: 'beginner',
      });
      alert('Profile created successfully!');
    } catch (err) {
      setError('Failed to create profile');
    }
  };

  // Add match result
  const handleAddMatch = async (e) => {
    e.preventDefault();
    if (!selectedProfile) return;

    try {
      // Update the selected profile in the profiles array
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

  if (token && user) {
    return (
      <div className="min-h-screen bg-bg py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-navy">Admin Dashboard</h1>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-4 px-6 font-bold transition ${
                  activeTab === 'overview'
                    ? 'bg-blue text-white'
                    : 'bg-gray-50 text-navy hover:bg-gray-100'
                }`}
              >
                📊 Overview
              </button>
              <button
                onClick={() => setActiveTab('manage-profiles')}
                className={`flex-1 py-4 px-6 font-bold transition ${
                  activeTab === 'manage-profiles'
                    ? 'bg-blue text-white'
                    : 'bg-gray-50 text-navy hover:bg-gray-100'
                }`}
              >
                👥 Manage Profiles
              </button>
              <button
                onClick={() => setActiveTab('add-match')}
                className={`flex-1 py-4 px-6 font-bold transition ${
                  activeTab === 'add-match'
                    ? 'bg-blue text-white'
                    : 'bg-gray-50 text-navy hover:bg-gray-100'
                }`}
              >
                🎮 Add Match Result
              </button>
              <button
                onClick={() => setActiveTab('manage-tournaments')}
                className={`flex-1 py-4 px-6 font-bold transition ${
                  activeTab === 'manage-tournaments'
                    ? 'bg-blue text-white'
                    : 'bg-gray-50 text-navy hover:bg-gray-100'
                }`}
              >
                🏆 Manage Tournaments
              </button>
            </div>

            <div className="p-8">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}

              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-navy mb-6">Welcome, {user.name}!</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-blue/10 rounded-lg p-6 border-l-4 border-blue">
                      <p className="text-gray-600 text-sm mb-2">Logged in as</p>
                      <p className="text-2xl font-bold text-navy">{user.email}</p>
                    </div>
                    <div className="bg-gold/10 rounded-lg p-6 border-l-4 border-gold">
                      <p className="text-gray-600 text-sm mb-2">Total Players</p>
                      <p className="text-2xl font-bold text-gold">{profiles.length}</p>
                    </div>
                    <div className="bg-green-100 rounded-lg p-6 border-l-4 border-green-500">
                      <p className="text-gray-600 text-sm mb-2">Status</p>
                      <p className="text-2xl font-bold text-green-600">Active</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Manage Profiles Tab */}
              {activeTab === 'manage-profiles' && (
                <div className="space-y-8">
                  {/* Create New Profile */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-navy mb-4">Create New Player Profile</h3>
                    <form onSubmit={handleCreateProfile} className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={newProfile.firstName}
                        onChange={(e) =>
                          setNewProfile({ ...newProfile, firstName: e.target.value })
                        }
                        required
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={newProfile.lastName}
                        onChange={(e) =>
                          setNewProfile({ ...newProfile, lastName: e.target.value })
                        }
                        required
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={newProfile.email}
                        onChange={(e) =>
                          setNewProfile({ ...newProfile, email: e.target.value })
                        }
                        required
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue"
                      />
                      <select
                        value={newProfile.grade}
                        onChange={(e) =>
                          setNewProfile({ ...newProfile, grade: e.target.value })
                        }
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue"
                      >
                        <option value="9">Grade 9</option>
                        <option value="10">Grade 10</option>
                        <option value="11">Grade 11</option>
                        <option value="12">Grade 12</option>
                      </select>
                      <select
                        value={newProfile.experience}
                        onChange={(e) =>
                          setNewProfile({ ...newProfile, experience: e.target.value })
                        }
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                      <button
                        type="submit"
                        className="md:col-span-2 bg-blue text-white font-bold py-2 rounded hover:bg-navy transition"
                      >
                        Create Profile
                      </button>
                    </form>
                  </div>

                  {/* Profiles List */}
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-4">Player Profiles</h3>
                    {loadingProfiles ? (
                      <div className="flex justify-center py-8">
                        <ChessKnightLoader size="md" text="Loading profiles..." />
                      </div>
                    ) : profiles.length > 0 ? (
                      <div className="space-y-4">
                        {profiles.map((profile) => (
                          <div
                            key={profile._id}
                            className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition cursor-pointer"
                            onClick={() => setSelectedProfile(profile)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-bold text-navy text-lg">
                                  {profile.firstName} {profile.lastName}
                                </h4>
                                <p className="text-sm text-gray-600">{profile.email}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-blue text-lg">{profile.rating}</p>
                                <p className="text-xs text-gray-600">Rating</p>
                              </div>
                            </div>
                            <div className="flex gap-4 mt-2 text-sm">
                              <span className="text-green-600">✓ {profile.wins} Wins</span>
                              <span className="text-red-600">✗ {profile.losses} Losses</span>
                              <span className="text-gray-600">= {profile.draws} Draws</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-500 py-8">No profiles yet</p>
                    )}
                  </div>
                </div>
              )}

              {/* Add Match Result Tab */}
              {activeTab === 'add-match' && (
                <div>
                  <h3 className="text-xl font-bold text-navy mb-6">Add Match Result</h3>

                  {/* Select Player */}
                  <div className="mb-8">
                    <h4 className="font-bold text-navy mb-4">Select Player</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {profiles.length > 0 ? (
                        profiles.map((profile) => (
                          <button
                            key={profile._id}
                            onClick={() => setSelectedProfile(profile)}
                            className={`p-4 rounded-lg border-2 text-left transition ${
                              selectedProfile?._id === profile._id
                                ? 'border-blue bg-blue/10'
                                : 'border-gray-300 hover:border-blue'
                            }`}
                          >
                            <p className="font-bold text-navy">
                              {profile.firstName} {profile.lastName}
                            </p>
                            <p className="text-sm text-gray-600">{profile.email}</p>
                          </button>
                        ))
                      ) : (
                        <p className="text-gray-500">No profiles available. Create one first.</p>
                      )}
                    </div>
                  </div>

                  {/* Match Form */}
                  {selectedProfile && (
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-bold text-navy mb-4">
                        Add Match for {selectedProfile.firstName} {selectedProfile.lastName}
                      </h4>
                      <form onSubmit={handleAddMatch} className="space-y-4">
                        <input
                          type="text"
                          placeholder="Opponent Name"
                          value={matchForm.opponent}
                          onChange={(e) =>
                            setMatchForm({ ...matchForm, opponent: e.target.value })
                          }
                          required
                          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue"
                        />
                        <select
                          value={matchForm.result}
                          onChange={(e) =>
                            setMatchForm({ ...matchForm, result: e.target.value })
                          }
                          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue"
                        >
                          <option value="win">Win</option>
                          <option value="loss">Loss</option>
                          <option value="draw">Draw</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Event (optional)"
                          value={matchForm.event}
                          onChange={(e) =>
                            setMatchForm({ ...matchForm, event: e.target.value })
                          }
                          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue"
                        />
                        <textarea
                          placeholder="Notes (optional)"
                          value={matchForm.notes}
                          onChange={(e) =>
                            setMatchForm({ ...matchForm, notes: e.target.value })
                          }
                          rows="3"
                          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue"
                        />
                        <button
                          type="submit"
                          className="w-full bg-blue text-white font-bold py-2 rounded hover:bg-navy transition"
                        >
                          Add Match Result
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* Manage Tournaments Tab */}
              {activeTab === 'manage-tournaments' && (
                <div className="space-y-8">
                  {/* Create New Tournament */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-navy mb-4">Create New Tournament</h3>
                    <form onSubmit={handleCreateTournament} className="space-y-4">
                      <input
                        type="text"
                        placeholder="Tournament Name"
                        value={newTournament.name}
                        onChange={(e) =>
                          setNewTournament({ ...newTournament, name: e.target.value })
                        }
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue"
                      />
                      <textarea
                        placeholder="Description"
                        value={newTournament.description}
                        onChange={(e) =>
                          setNewTournament({ ...newTournament, description: e.target.value })
                        }
                        rows="2"
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue"
                      />
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="number"
                          placeholder="Max Participants"
                          value={newTournament.maxParticipants}
                          onChange={(e) =>
                            setNewTournament({ ...newTournament, maxParticipants: parseInt(e.target.value) })
                          }
                          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue"
                        />
                        <input
                          type="date"
                          value={newTournament.startDate}
                          onChange={(e) =>
                            setNewTournament({ ...newTournament, startDate: e.target.value })
                          }
                          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue"
                        />
                        <input
                          type="text"
                          placeholder="Location"
                          value={newTournament.location}
                          onChange={(e) =>
                            setNewTournament({ ...newTournament, location: e.target.value })
                          }
                          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue"
                        />
                        <input
                          type="number"
                          placeholder="Entry Fee"
                          value={newTournament.entryFee}
                          onChange={(e) =>
                            setNewTournament({ ...newTournament, entryFee: parseInt(e.target.value) })
                          }
                          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-blue text-white font-bold py-2 rounded hover:bg-navy transition"
                      >
                        Create Tournament
                      </button>
                    </form>
                  </div>

                  {/* Tournaments List */}
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-4">Tournaments</h3>
                    {loadingProfiles ? (
                      <div className="flex justify-center py-8">
                        <ChessKnightLoader size="md" text="Loading tournaments..." />
                      </div>
                    ) : tournaments.length > 0 ? (
                      <div className="space-y-6">
                        {tournaments.map((tournament) => (
                          <div key={tournament._id} className="border-2 border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-blue to-navy text-white p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="font-bold text-lg">{tournament.name}</h4>
                                  <p className="text-gray-200">{tournament.description}</p>
                                </div>
                                <span className={`px-3 py-1 text-sm font-bold rounded ${
                                  tournament.status === 'registration' ? 'bg-blue-600' :
                                  tournament.status === 'in-progress' ? 'bg-gold text-navy' :
                                  'bg-green-500'
                                }`}>
                                  {tournament.status === 'registration' ? 'Registration' :
                                   tournament.status === 'in-progress' ? 'In Progress' :
                                   'Completed'}
                                </span>
                              </div>
                              <div className="flex gap-4 text-sm text-gray-200">
                                <span>👥 {tournament.registeredParticipants.length} / {tournament.maxParticipants}</span>
                                <span>📅 {new Date(tournament.startDate).toLocaleDateString()}</span>
                                <span>📍 {tournament.location}</span>
                              </div>
                            </div>

                            <div className="p-4 space-y-4">
                              {/* Registered Participants */}
                              <div>
                                <h5 className="font-bold text-navy mb-2">Registered Participants ({tournament.registeredParticipants.length})</h5>
                                <div className="space-y-2 max-h-32 overflow-y-auto bg-gray-50 p-3 rounded">
                                  {tournament.registeredParticipants.length > 0 ? (
                                    tournament.registeredParticipants.map(p => (
                                      <div key={p._id} className="flex justify-between items-center p-2 bg-white rounded border border-gray-200">
                                        <div>
                                          <p className="font-bold">{p.firstName} {p.lastName}</p>
                                          <p className="text-xs text-gray-600">Rating: {p.rating}</p>
                                        </div>
                                        {tournament.status === 'registration' && (
                                          <button
                                            onClick={() => removeTournamentParticipant(tournament._id, p._id)}
                                            className="text-red-600 hover:text-red-800 font-bold"
                                          >
                                            ✕
                                          </button>
                                        )}
                                      </div>
                                    ))
                                  ) : (
                                    <p className="text-gray-500 text-sm italic">No participants yet</p>
                                  )}
                                </div>
                              </div>

                              {/* Add Participants (only during registration) */}
                              {tournament.status === 'registration' && (
                                <div>
                                  <h5 className="font-bold text-navy mb-2">Available Players to Add</h5>
                                  <div className="space-y-2 max-h-32 overflow-y-auto bg-gray-50 p-3 rounded">
                                    {fakeProfiles
                                      .filter(p => !tournament.registeredParticipants.find(tp => tp._id === p._id))
                                      .map(player => (
                                        <button
                                          key={player._id}
                                          onClick={() => addTournamentParticipant(tournament._id, player)}
                                          className="w-full text-left p-2 bg-white hover:bg-blue/10 rounded border border-gray-200 transition text-sm"
                                        >
                                          <div className="flex justify-between">
                                            <span className="font-bold">{player.firstName} {player.lastName}</span>
                                            <span className="text-gray-600">({player.rating})</span>
                                          </div>
                                        </button>
                                      ))}
                                  </div>
                                </div>
                              )}

                              {/* Action Button */}
                              <div className="flex gap-2 pt-2 border-t">
                                {tournament.status === 'registration' && (
                                  <button
                                    onClick={() => handleStartTournament(tournament._id)}
                                    className="flex-1 bg-gold text-navy px-4 py-2 rounded font-bold hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={tournament.registeredParticipants.length < 2}
                                  >
                                    🚀 Start Tournament
                                  </button>
                                )}
                                {tournament.status !== 'registration' && (
                                  <button
                                    onClick={() => setSelectedTournament(tournament)}
                                    className="flex-1 bg-blue text-white px-4 py-2 rounded font-bold hover:bg-navy transition"
                                  >
                                    📊 View Bracket
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-500 py-8">No tournaments created yet</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-navy mb-8 text-center">Admin Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded text-sm">
              {error}
            </div>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border-2 border-gray-300 rounded px-4 py-2 focus:border-blue outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border-2 border-gray-300 rounded px-4 py-2 focus:border-blue outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy text-white font-bold py-2 rounded hover:bg-blue transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-xs text-gray-600 text-center mt-6">
          Demo: admin@chess.club / Chess@2024
        </p>
      </div>
    </div>
  );
};
