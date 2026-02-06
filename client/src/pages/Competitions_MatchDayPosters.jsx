import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const CompetitionsMatchDayPosters = () => {
  const navigate = useNavigate();
  const { user, userType } = useContext(AuthContext);
  const [tournaments, setTournaments] = useState([]);
  const [registeredTournaments, setRegisteredTournaments] = useState([]);

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
      alert('Full');
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

  const getEventColor = (format) => {
    const colors = {
      'round-robin': { bg: 'from-yellow-500 to-amber-600', accent: 'yellow', tag: 'TOURNAMENT' },
      'blitz': { bg: 'from-blue-500 to-cyan-600', accent: 'blue', tag: 'TRAINING' },
      'casual': { bg: 'from-emerald-500 to-teal-600', accent: 'emerald', tag: 'SOCIAL' },
    };
    return colors[format] || colors['casual'];
  };

  const isRegistered = (id) => registeredTournaments.includes(id);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Poster */}
      <div className="relative bg-gradient-to-br from-slate-900 to-black text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <p className="text-yellow-400 font-bold tracking-widest mb-4">🎭 MATCH DAY SERIES 2026</p>
          <h1 className="text-6xl md:text-7xl font-black mb-4">CHESS EVENTS</h1>
          <p className="text-xl text-slate-300">Bold competitions • Exciting moments • School pride</p>
        </div>
      </div>

      {/* Auth Banner */}
      {!user && (
        <div className="bg-yellow-50 border-b-2 border-yellow-300">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-yellow-900 font-bold">🎯 Register to compete in events</p>
            </div>
            <button
              onClick={() => navigate('/member-auth')}
              className="px-6 py-2 bg-yellow-500 text-black rounded font-bold hover:bg-yellow-600 transition"
            >
              SIGN IN
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Event Posters Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tournaments.map((tournament, idx) => {
            const colors = getEventColor(tournament.format);
            const participantCount = (tournament.participants || []).length;
            const isFull = participantCount >= tournament.maxParticipants;
            const isUserReg = isRegistered(tournament._id);
            const startDate = new Date(tournament.startDate);

            return (
              <div
                key={tournament._id}
                className={`relative group bg-gradient-to-br ${colors.bg} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2`}
              >
                {/* Poster Content */}
                <div className="relative p-8 h-96 flex flex-col justify-between text-white">
                  {/* Top Tag */}
                  <div className="flex items-start justify-between">
                    <div className="inline-block bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                      <p className="text-xs font-black tracking-widest">{colors.tag}</p>
                    </div>
                    <div className="text-4xl opacity-50">♔</div>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-3xl font-black mb-2 leading-tight">{tournament.name}</h3>
                    <p className="text-sm opacity-90">{tournament.description}</p>
                  </div>

                  {/* Bottom - Date & Participants */}
                  <div className="space-y-3 pt-6 border-t border-white/30">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs opacity-75 font-semibold">DATE & TIME</p>
                        <p className="text-2xl font-black">
                          {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs opacity-75 font-semibold">PLAYERS</p>
                        <p className={`text-xl font-black ${isFull ? 'text-red-200' : ''}`}>
                          {participantCount}/{tournament.maxParticipants}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay - Registration */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-4 p-6">
                  <div className="text-center mb-4">
                    <p className="text-white font-bold mb-2">Ready to join?</p>
                    <p className="text-sm text-slate-300">{tournament.format.toUpperCase()} • {(tournament.participants || []).length} registered</p>
                  </div>

                  {isFull ? (
                    <button disabled className="w-full py-3 bg-slate-600 text-white rounded-lg font-bold cursor-not-allowed">
                      ❌ TOURNAMENT FULL
                    </button>
                  ) : isUserReg ? (
                    <button disabled className="w-full py-3 bg-emerald-500 text-white rounded-lg font-bold cursor-default">
                      ✓ YOU'RE IN
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRegister(tournament._id)}
                      className="w-full py-3 bg-yellow-400 text-black rounded-lg font-black hover:bg-yellow-300 transition"
                    >
                      REGISTER NOW →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {tournaments.length === 0 && (
          <div className="text-center py-20">
            <p className="text-3xl font-bold text-slate-700 mb-2">No Events Yet</p>
            <p className="text-slate-600">Check back soon for exciting competitions!</p>
          </div>
        )}
      </div>
    </div>
  );
};
