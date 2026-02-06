import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const CompetitionsModernGlass = () => {
  const navigate = useNavigate();
  const { user, userType } = useContext(AuthContext);
  const [tournaments, setTournaments] = useState([]);
  const [registeredTournaments, setRegisteredTournaments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredTournaments = tournaments.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Hero */}
      <div className="relative pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-4 drop-shadow-lg">
            MODERN TOURNAMENTS
          </h1>
          <p className="text-xl text-purple-200/80 max-w-2xl mx-auto mb-8">
            Glass-morphism design with premium feel
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Search tournaments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>
      </div>

      {/* Auth Banner */}
      {!user && (
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-purple-400/30 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p className="text-white font-bold">Ready to compete?</p>
              <p className="text-purple-200 text-sm">Sign in to register for tournaments</p>
            </div>
            <button
              onClick={() => navigate('/member-auth')}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-bold hover:from-purple-600 hover:to-blue-600 transition"
            >
              Sign In
            </button>
          </div>
        </div>
      )}

      {/* Tournaments Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        {filteredTournaments.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredTournaments.map((tournament) => {
              const participantCount = (tournament.participants || []).length;
              const isFull = participantCount >= tournament.maxParticipants;
              const isUserReg = isRegistered(tournament._id);
              const fillPercentage = (participantCount / tournament.maxParticipants) * 100;

              return (
                <div
                  key={tournament._id}
                  className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:border-purple-400/50 transition hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-1 h-12 bg-gradient-to-b from-purple-400 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition"></div>

                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">{tournament.name}</h3>
                      <p className="text-purple-200/70 text-sm">{tournament.description}</p>
                    </div>
                    <div className="text-4xl opacity-40">♞</div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-3 gap-4 py-6 border-t border-white/10 mb-6">
                    <div>
                      <p className="text-xs text-purple-300 font-semibold mb-1">DATE</p>
                      <p className="text-white font-bold">
                        {new Date(tournament.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-purple-300 font-semibold mb-1">FORMAT</p>
                      <p className="text-white font-bold capitalize">{tournament.format}</p>
                    </div>
                    <div>
                      <p className="text-xs text-purple-300 font-semibold mb-1">PLAYERS</p>
                      <p className={`text-white font-bold ${isFull ? 'text-red-400' : ''}`}>
                        {participantCount}/{tournament.maxParticipants}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300"
                        style={{ width: `${Math.min(fillPercentage, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-purple-200/60 mt-2">
                      {participantCount} registered • {Math.max(0, tournament.maxParticipants - participantCount)} spots left
                    </p>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => handleRegister(tournament._id)}
                    disabled={isFull || isUserReg}
                    className={`w-full py-3 rounded-lg font-bold transition ${
                      isUserReg
                        ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/50 cursor-default'
                        : isFull
                        ? 'bg-white/5 text-white/30 border border-white/10 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 border border-white/20'
                    }`}
                  >
                    {isUserReg ? '✓ Registered' : isFull ? 'Full' : 'Register Now'}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-purple-300 text-lg">No tournaments found</p>
          </div>
        )}
      </div>
    </div>
  );
};
