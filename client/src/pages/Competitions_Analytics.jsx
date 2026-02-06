import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const CompetitionsAnalytics = () => {
  const navigate = useNavigate();
  const { user, userType } = useContext(AuthContext);
  const [tournaments, setTournaments] = useState([]);
  const [registeredTournaments, setRegisteredTournaments] = useState([]);
  const [filterLevel, setFilterLevel] = useState('all');

  useEffect(() => {
    loadTournaments();
  }, [user]);

  const loadTournaments = () => {
    const saved = localStorage.getItem('tournaments');
    if (saved) {
      try {
        setTournaments(JSON.parse(saved));
      } catch (error) {
        setTournaments([]);
      }
    }
    if (user?.registeredTournaments) {
      setRegisteredTournaments(user.registeredTournaments);
    }
  };

  const handleRegister = (tournamentId) => {
    if (!user || userType !== 'member') {
      navigate('/member-auth');
      return;
    }

    const tournament = tournaments.find(t => t._id === tournamentId);
    if (!tournament) return;

    if ((tournament.participants || []).find(p => p._id === user._id)) {
      alert('Already registered');
      return;
    }

    if ((tournament.participants || []).length >= tournament.maxParticipants) {
      alert('Tournament full');
      return;
    }

    const updated = tournaments.map(t => {
      if (t._id === tournamentId) {
        return { ...t, participants: [...(t.participants || []), user] };
      }
      return t;
    });

    setTournaments(updated);
    localStorage.setItem('tournaments', JSON.stringify(updated));
    setRegisteredTournaments([...registeredTournaments, tournamentId]);
  };

  const isRegistered = (id) => registeredTournaments.includes(id);

  // Stats
  const totalParticipants = tournaments.reduce((sum, t) => sum + (t.participants || []).length, 0);
  const availableSpots = tournaments.reduce((sum, t) => sum + Math.max(0, t.maxParticipants - (t.participants || []).length), 0);
  const fullTournaments = tournaments.filter(t => (t.participants || []).length >= t.maxParticipants).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-black mb-4">Tournament Analytics</h1>
          <p className="text-slate-400 text-lg">Real-time competition data & insights</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="border-b border-slate-700 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-lg">
            <p className="text-slate-400 text-sm font-bold mb-2">TOTAL EVENTS</p>
            <p className="text-4xl font-black">{tournaments.length}</p>
          </div>
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-lg">
            <p className="text-slate-400 text-sm font-bold mb-2">REGISTERED</p>
            <p className="text-4xl font-black text-blue-400">{totalParticipants}</p>
          </div>
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-lg">
            <p className="text-slate-400 text-sm font-bold mb-2">AVAILABLE</p>
            <p className="text-4xl font-black text-emerald-400">{availableSpots}</p>
          </div>
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-lg">
            <p className="text-slate-400 text-sm font-bold mb-2">FULL</p>
            <p className="text-4xl font-black text-red-400">{fullTournaments}</p>
          </div>
        </div>
      </div>

      {/* Auth Banner */}
      {!user && (
        <div className="border-b border-slate-700 py-8 px-6">
          <div className="max-w-7xl mx-auto bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-700/50 rounded-lg p-6 flex items-center justify-between">
            <div>
              <p className="text-white font-bold mb-1">Sign in to register</p>
              <p className="text-slate-400">Create an account to participate in tournaments</p>
            </div>
            <button
              onClick={() => navigate('/member-auth')}
              className="px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition whitespace-nowrap"
            >
              Sign In
            </button>
          </div>
        </div>
      )}

      {/* Tournaments Grid */}
      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Filter */}
          <div className="mb-8 flex gap-3 flex-wrap">
            {['all', 'open', 'full'].map(level => (
              <button
                key={level}
                onClick={() => setFilterLevel(level)}
                className={`px-4 py-2 rounded font-bold text-sm uppercase tracking-wide transition ${
                  filterLevel === level
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-400 border border-slate-700 hover:border-slate-600'
                }`}
              >
                {level === 'all' ? 'All Events' : level === 'open' ? 'Open' : 'Full'}
              </button>
            ))}
          </div>

          {/* Tournament Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map((tournament) => {
              const participantCount = (tournament.participants || []).length;
              const isFull = participantCount >= tournament.maxParticipants;
              const isUserReg = isRegistered(tournament._id);
              const fillPercentage = (participantCount / tournament.maxParticipants) * 100;

              // Filter logic
              if (filterLevel === 'open' && isFull) return null;
              if (filterLevel === 'full' && !isFull) return null;

              return (
                <div
                  key={tournament._id}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition group"
                >
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition">
                    {tournament.name}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">{tournament.description}</p>

                  {/* Stats */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-slate-700">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Date</span>
                      <span className="font-bold">
                        {new Date(tournament.startDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Format</span>
                      <span className="font-bold capitalize">{tournament.format}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Capacity</span>
                      <span className={`font-bold ${isFull ? 'text-red-400' : 'text-emerald-400'}`}>
                        {participantCount}/{tournament.maxParticipants}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="w-full h-2 bg-slate-800 rounded overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          fillPercentage > 80 ? 'bg-red-500' : fillPercentage > 50 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(fillPercentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => handleRegister(tournament._id)}
                    disabled={isFull || isUserReg}
                    className={`w-full py-2 rounded font-bold text-sm uppercase tracking-wide transition ${
                      isUserReg
                        ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-700 cursor-default'
                        : isFull
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isUserReg ? '✓ Registered' : isFull ? 'Full' : 'Register'}
                  </button>
                </div>
              );
            })}
          </div>

          {tournaments.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg">No tournaments available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
