import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const CompetitionsMinimalAcademic = () => {
  const navigate = useNavigate();
  const { user, userType } = useContext(AuthContext);
  const [tournaments, setTournaments] = useState([]);
  const [registeredTournaments, setRegisteredTournaments] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

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
      alert('Tournament is full');
      return;
    }

    const updated = tournaments.map(t => {
      if (t._id === tournamentId) {
        return {
          ...t,
          participants: [...(t.participants || []), user]
        };
      }
      return t;
    });

    setTournaments(updated);
    localStorage.setItem('tournaments', JSON.stringify(updated));
    setRegisteredTournaments([...registeredTournaments, tournamentId]);
  };

  const isRegistered = (id) => registeredTournaments.includes(id);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Clean Header */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 border-b border-blue-700">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="text-amber-100 text-sm font-semibold mb-2">EVENTS & TOURNAMENTS</p>
          <h1 className="text-4xl font-light text-amber-100 mb-2">Upcoming Competitions</h1>
          <p className="text-amber-100/70">Strategic events for every skill level</p>
        </div>
      </div>

      {/* Auth Banner */}
      {!user && (
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-slate-900 font-medium">Create an account to register</p>
              <p className="text-sm text-slate-600">Join tournaments and track your progress</p>
            </div>
            <button
              onClick={() => navigate('/member-auth')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Sidebar - Calendar & Filters */}
          <div className="space-y-8">
            {/* Month Calendar */}
            <div className="bg-white p-6 border border-slate-200 rounded-lg">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">SELECT MONTH</h3>
              <div className="grid grid-cols-3 gap-2">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedMonth(i)}
                    className={`py-2 text-xs font-semibold rounded ${
                      selectedMonth === i
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 border border-slate-200 rounded-lg">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">SKILL LEVEL</h3>
              <div className="space-y-2">
                {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map(level => (
                  <label key={level} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                    <span className="text-sm text-slate-700">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <p className="text-sm font-semibold text-blue-900 mb-2">💡 Pro Tip</p>
              <p className="text-xs text-blue-800">Register early for tournaments to secure your spot</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {tournaments.length > 0 ? (
              tournaments.map((tournament, idx) => {
                const participantCount = (tournament.participants || []).length;
                const isFull = participantCount >= tournament.maxParticipants;
                const isUserReg = isRegistered(tournament._id);

                return (
                  <div
                    key={tournament._id}
                    className="bg-white border border-slate-200 rounded-lg p-8 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-slate-900">{tournament.name}</h3>
                        <p className="text-sm text-slate-600 mt-1">{tournament.description}</p>
                      </div>
                      <span className="text-3xl opacity-30">♞</span>
                    </div>

                    <div className="grid grid-cols-4 gap-4 py-6 border-t border-b border-slate-100 mb-6">
                      <div>
                        <p className="text-xs text-slate-600 font-semibold mb-1">DATE</p>
                        <p className="text-sm font-semibold text-slate-900">
                          {new Date(tournament.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 font-semibold mb-1">FORMAT</p>
                        <p className="text-sm font-semibold text-slate-900 capitalize">{tournament.format}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 font-semibold mb-1">LEVEL</p>
                        <p className="text-sm font-semibold text-slate-900">All</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 font-semibold mb-1">SPOTS</p>
                        <p className={`text-sm font-semibold ${isFull ? 'text-red-600' : 'text-slate-900'}`}>
                          {participantCount}/{tournament.maxParticipants}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-blue-600 h-full"
                            style={{ width: `${Math.min((participantCount / tournament.maxParticipants) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          {participantCount} registered • {tournament.maxParticipants - participantCount} spots left
                        </p>
                      </div>
                      <button
                        onClick={() => handleRegister(tournament._id)}
                        disabled={isFull || isUserReg}
                        className={`px-6 py-2 rounded font-semibold text-sm transition whitespace-nowrap ${
                          isUserReg
                            ? 'bg-emerald-100 text-emerald-700 cursor-default'
                            : isFull
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {isUserReg ? '✓ Registered' : isFull ? 'Full' : 'Register'}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white border border-slate-200 p-12 rounded-lg text-center">
                <p className="text-slate-600">No tournaments scheduled</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
