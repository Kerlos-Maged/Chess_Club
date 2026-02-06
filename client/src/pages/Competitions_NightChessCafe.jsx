import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const CompetitionsNightChessCafe = () => {
  const navigate = useNavigate();
  const { user, userType } = useContext(AuthContext);
  const [tournaments, setTournaments] = useState([]);
  const [registeredTournaments, setRegisteredTournaments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  const categories = [
    { id: 'all', label: 'All Events', icon: '♟️' },
    { id: 'tournament', label: 'Tournaments', icon: '🏆' },
    { id: 'training', label: 'Training', icon: '📚' },
    { id: 'social', label: 'Social Games', icon: '☕' },
  ];

  const getAccentColor = (format) => {
    const colors = {
      'round-robin': 'from-amber-400 via-orange-400 to-red-500',
      'blitz': 'from-purple-400 via-pink-400 to-red-400',
      'casual': 'from-cyan-300 via-blue-400 to-purple-500',
    };
    return colors[format] || 'from-amber-300 via-yellow-400 to-orange-500';
  };

  const filteredTournaments =
    selectedCategory === 'all'
      ? tournaments
      : tournaments.filter(t => t.format === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-amber-950 to-slate-950 text-amber-50">
      {/* Warm Background Glow */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-orange-600 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-20 pb-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-4 px-6 py-2 bg-amber-900/50 backdrop-blur-sm border border-amber-700 rounded-full">
            <p className="text-amber-300 font-bold text-sm tracking-widest">☕ NIGHT GAMES • WARM COMPANY</p>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 text-amber-100 leading-tight">
            Chess Nights & Café Vibes
          </h1>
          <p className="text-xl text-amber-200/80 max-w-2xl mx-auto mb-8">
            Cozy competitions where chess lovers gather. Warm ambiance, passionate games, and community spirit.
          </p>

          {/* Ambient Quote */}
          <div className="italic text-amber-300/60 text-lg mb-12">
            "Where every move tells a story over coffee..."
          </div>

          {!user && (
            <button
              onClick={() => navigate('/member-auth')}
              className="inline-block px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 rounded-lg font-black hover:from-amber-300 hover:to-orange-400 transition"
            >
              JOIN THE CAFÉ ↓
            </button>
          )}
        </div>
      </div>

      {/* Category Navigation */}
      <div className="relative max-w-6xl mx-auto px-6 mb-12">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-lg font-bold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 shadow-lg'
                  : 'bg-amber-900/30 backdrop-blur-sm border border-amber-700 text-amber-300 hover:border-amber-600'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tournaments Grid */}
      <div className="relative max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredTournaments.map((tournament, idx) => {
            const participantCount = (tournament.participants || []).length;
            const isFull = participantCount >= tournament.maxParticipants;
            const isUserReg = isRegistered(tournament._id);
            const accentGrad = getAccentColor(tournament.format);
            const startDate = new Date(tournament.startDate);

            // Staggered animation
            const animationDelay = idx * 0.1;

            return (
              <div
                key={tournament._id}
                style={{ animationDelay: `${animationDelay}s` }}
                className="relative group"
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${accentGrad} rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition duration-500`}></div>

                {/* Card */}
                <div className="relative bg-gradient-to-br from-amber-950/80 to-slate-950/80 backdrop-blur-sm border border-amber-800/50 rounded-xl p-8 hover:border-amber-600 transition overflow-hidden">
                  {/* Corner Accent */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${accentGrad} opacity-10 rounded-bl-3xl`}></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">☕</span>
                          <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                            {tournament.format}
                          </span>
                        </div>
                        <h3 className="text-2xl font-black text-amber-100 mb-2">{tournament.name}</h3>
                        <p className="text-amber-200/70 text-sm">{tournament.description}</p>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 my-6 py-6 border-t border-b border-amber-800/30">
                      <div>
                        <p className="text-xs text-amber-400/70 font-semibold mb-1">DATE</p>
                        <p className="text-lg font-black text-amber-100">
                          {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-amber-400/70 font-semibold mb-1">PLAYERS</p>
                        <p className={`text-lg font-black ${isFull ? 'text-orange-400' : 'text-amber-100'}`}>
                          {participantCount}/{tournament.maxParticipants}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-amber-400/70 font-semibold mb-1">TIME</p>
                        <p className="text-lg font-black text-amber-100">
                          {startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    {isFull ? (
                      <button disabled className="w-full py-3 bg-slate-700 text-slate-400 rounded-lg font-bold cursor-not-allowed">
                        ☕ CAFÉ FULL
                      </button>
                    ) : isUserReg ? (
                      <button disabled className="w-full py-3 bg-gradient-to-r from-emerald-700 to-emerald-800 text-emerald-100 rounded-lg font-bold">
                        ✓ YOU'RE BOOKED
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRegister(tournament._id)}
                        className={`w-full py-3 bg-gradient-to-r ${accentGrad} text-slate-900 rounded-lg font-black hover:shadow-xl transition`}
                      >
                        RESERVE YOUR SEAT →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTournaments.length === 0 && (
          <div className="text-center py-20">
            <p className="text-3xl font-bold text-amber-200 mb-2">☕ No events brewing</p>
            <p className="text-amber-300/60">Try a different category or check back soon</p>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="relative border-t border-amber-800/30 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-amber-300/60 italic">
            "The best games are played with friends, coffee in hand, and passion in every move."
          </p>
        </div>
      </div>
    </div>
  );
};
