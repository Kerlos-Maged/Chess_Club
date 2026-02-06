import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const CompetitionsPremiumCards = () => {
  const navigate = useNavigate();
  const { user, userType } = useContext(AuthContext);
  const [tournaments, setTournaments] = useState([]);
  const [registeredTournaments, setRegisteredTournaments] = useState([]);
  const [sortBy, setSortBy] = useState('date');

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

  const getRankBadge = (idx) => {
    const badges = ['🥇', '🥈', '🥉'];
    return badges[idx] || '';
  };

  const sorted = [...tournaments].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(a.startDate) - new Date(b.startDate);
    } else if (sortBy === 'participants') {
      return (b.participants || []).length - (a.participants || []).length;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-6 border-b-4 border-amber-500">
        <div className="max-w-6xl mx-auto">
          <p className="text-amber-400 font-bold text-sm tracking-widest mb-2">⭐ EXCLUSIVE EVENTS</p>
          <h1 className="text-5xl md:text-6xl font-black mb-4">Premium Tournaments</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Elite competitions for serious players. High stakes, premium experience, exclusive rewards.
          </p>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="bg-slate-50 border-b border-slate-200 sticky top-28 z-30">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Upcoming Tournaments</h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="date">Sort by Date</option>
            <option value="participants">Sort by Popularity</option>
          </select>
        </div>
      </div>

      {/* Auth Banner */}
      {!user && (
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-8 flex items-center justify-between">
            <div>
              <p className="text-amber-900 font-bold text-lg">Join our exclusive tournaments</p>
              <p className="text-amber-800">Create an account to register and compete with other chess enthusiasts</p>
            </div>
            <button
              onClick={() => navigate('/member-auth')}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-bold hover:from-amber-600 hover:to-yellow-600 transition whitespace-nowrap"
            >
              Register Now
            </button>
          </div>
        </div>
      )}

      {/* Tournament Cards */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="space-y-6">
          {sorted.map((tournament, idx) => {
            const participantCount = (tournament.participants || []).length;
            const isFull = participantCount >= tournament.maxParticipants;
            const isUserReg = isRegistered(tournament._id);
            const startDate = new Date(tournament.startDate);

            return (
              <div
                key={tournament._id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl transition group"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Left: Rank & Icon */}
                  <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white w-full md:w-48 p-8 flex flex-col items-center justify-center">
                    {idx < 3 && <div className="text-6xl mb-4">{getRankBadge(idx)}</div>}
                    <div className="text-5xl opacity-40">♔</div>
                  </div>

                  {/* Right: Content */}
                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-3xl font-bold text-slate-900 mb-2">{tournament.name}</h3>
                          <p className="text-slate-600 text-lg">{tournament.description}</p>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-4 gap-4 py-6 border-t border-b border-slate-100">
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Scheduled</p>
                          <p className="text-xl font-bold text-slate-900">
                            {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Format</p>
                          <p className="text-xl font-bold text-slate-900 capitalize">{tournament.format}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Registered</p>
                          <p className={`text-xl font-bold ${isFull ? 'text-red-600' : 'text-emerald-600'}`}>
                            {participantCount}/{tournament.maxParticipants}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Status</p>
                          <p className={`text-xl font-bold ${isFull ? 'text-red-600' : 'text-blue-600'}`}>
                            {isFull ? 'Full' : 'Open'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Button */}
                    <div className="mt-6">
                      <button
                        onClick={() => handleRegister(tournament._id)}
                        disabled={isFull || isUserReg}
                        className={`px-8 py-3 rounded-xl font-bold text-lg transition ${
                          isUserReg
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-300 cursor-default'
                            : isFull
                            ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                            : 'bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:from-slate-800 hover:to-slate-700 border border-slate-700'
                        }`}
                      >
                        {isUserReg ? '✓ Registered' : isFull ? 'Tournament Full' : 'Register & Compete'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-600 text-lg">No tournaments scheduled yet</p>
          </div>
        )}
      </div>
    </div>
  );
};
