import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ChessAnimation } from '../components/Common';

export const Competitions = () => {
  const navigate = useNavigate();
  const { user, userType, token } = useContext(AuthContext);
  const [tournaments, setTournaments] = useState([]);
  const [registeredTournaments, setRegisteredTournaments] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Image placeholder component
  const ChessImagePlaceholder = ({ icon, text }) => (
    <div className="w-full h-full bg-gradient-to-br from-amber-700/40 via-slate-800/30 to-slate-900/40 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full flex items-center justify-center text-9xl animate-pulse">{icon}</div>
      </div>
      <div className="text-center z-10">
        <div className="text-8xl mb-4 animate-bounce">{icon}</div>
        <p className="text-white font-bold text-2xl drop-shadow-lg">{text}</p>
      </div>
    </div>
  );

  useEffect(() => {
    loadTournaments();
  }, [user]);

  const loadTournaments = () => {
    const saved = localStorage.getItem('tournaments');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTournaments(parsed);
      } catch (error) {
        console.error('Error parsing tournaments:', error);
        setTournaments([]);
      }
    }

    if (user && userType === 'member') {
      const registered = user.registeredTournaments || [];
      setRegisteredTournaments(registered);
    }
  };

  const handleRegister = (tournamentId) => {
    if (!user || userType !== 'member') {
      navigate('/member-auth', { state: { from: location } });
      return;
    }

    const tournament = tournaments.find(t => t._id === tournamentId);
    if (!tournament) return;

    if ((tournament.participants || []).find(p => p._id === user._id)) {
      alert('✓ You are already registered for this tournament!');
      return;
    }

    if ((tournament.participants || []).length >= tournament.maxParticipants) {
      alert('❌ Tournament is full!');
      return;
    }

    if (tournament.status === 'completed' || tournament.status === 'in-progress') {
      alert('❌ Cannot register for this tournament at this time.');
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

    const updatedUser = {
      ...user,
      registeredTournaments: [...(user.registeredTournaments || []), tournamentId]
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setRegisteredTournaments([...registeredTournaments, tournamentId]);

    alert('✓ Successfully registered for the tournament!');
  };

  const handleWithdraw = (tournamentId) => {
    if (!user) return;

    const updated = tournaments.map(t => {
      if (t._id === tournamentId) {
        return {
          ...t,
          participants: (t.participants || []).filter(p => p._id !== user._id)
        };
      }
      return t;
    });

    setTournaments(updated);
    localStorage.setItem('tournaments', JSON.stringify(updated));

    const updatedUser = {
      ...user,
      registeredTournaments: (user.registeredTournaments || []).filter(id => id !== tournamentId)
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));

    setRegisteredTournaments(registeredTournaments.filter(id => id !== tournamentId));
    alert('✓ Withdrawn from tournament.');
  };

  const isRegistered = (tournamentId) => registeredTournaments.includes(tournamentId);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Full-Screen Immersive Hero with Interactive Title */}
      <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950"></div>
          <div className="grid grid-cols-8 w-full h-full opacity-10">
            {[...Array(64)].map((_, i) => (
              <div key={i} className="border border-slate-600/20 flex items-center justify-center text-2xl hover:text-yellow-400 transition cursor-pointer">
                {['♔', '♕', '♖', '♗', '♘', '♙'][i % 6]}
              </div>
            ))}
          </div>
        </div>

        {/* Glow Effects */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-yellow-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Main Title Section */}
        <div className="relative z-20 text-center max-w-5xl px-6">
          {/* Top Badge */}
          <div className="mb-12 flex items-center justify-center gap-4">
            <div className="h-1 w-12 bg-gradient-to-r from-transparent to-yellow-400"></div>
            <span className="text-yellow-300 font-bold text-lg tracking-widest">CHESS CHAMPIONSHIPS 2026</span>
            <div className="h-1 w-12 bg-gradient-to-l from-transparent to-yellow-400"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-8xl md:text-9xl font-black text-white mb-8 leading-none drop-shadow-2xl" style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #60a5fa 25%, #34d399 50%, #f472b6 75%, #fbbf24 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'gradientShift 4s ease infinite'
          }}>
            BATTLE <br/> THE BOARD
          </h1>

          {/* Subtitle */}
          <p className="text-2xl md:text-3xl text-slate-300 mb-12 font-light leading-relaxed max-w-3xl mx-auto">
            Join elite chess players in the most prestigious tournament series. Compete, conquer, and claim your crown.
          </p>

          {/* Stats Overview */}
          <div className="grid grid-cols-3 gap-6 mb-16 max-w-2xl mx-auto">
            <div className="bg-slate-800/40 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6 hover:border-yellow-400/60 transition">
              <div className="text-4xl font-black text-yellow-400 mb-2">{tournaments.length}</div>
              <div className="text-slate-400 text-sm font-bold">TOURNAMENTS</div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-6 hover:border-cyan-400/60 transition">
              <div className="text-4xl font-black text-cyan-400 mb-2">
                {tournaments.reduce((sum, t) => sum + (t.participants?.length || 0), 0)}
              </div>
              <div className="text-slate-400 text-sm font-bold">COMPETITORS</div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6 hover:border-purple-400/60 transition">
              <div className="text-4xl font-black text-purple-400 mb-2">∞</div>
              <div className="text-slate-400 text-sm font-bold">GLORY</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => user && userType === 'member' ? document.getElementById('tournaments-section').scrollIntoView({ behavior: 'smooth' }) : navigate('/member-auth')}
              className="group relative px-12 py-5 rounded-2xl font-bold text-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:from-yellow-300 group-hover:to-yellow-400 transition"></div>
              <span className="relative text-slate-900 flex items-center gap-2">
                ♔ REGISTER NOW
              </span>
            </button>
            <button className="px-12 py-5 rounded-2xl font-bold text-lg border-2 border-slate-400 text-slate-300 hover:border-slate-200 hover:text-slate-100 transition">
              LEARN MORE
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
          <div className="text-slate-400 text-center">
            <p className="text-sm mb-2">Scroll to explore</p>
            <div className="flex flex-col items-center">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>

      {/* Tournaments Section */}
      <div id="tournaments-section" className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-24">
            <div className="inline-block mb-6">
              <span className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 text-yellow-300 font-bold text-sm tracking-widest">
                ♖ FEATURED COMPETITIONS
              </span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black text-white mb-6">
              Upcoming <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Tournaments</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">Pick your competition and join the elite players competing for glory</p>
          </div>

          {/* Auth Status */}
          {!user ? (
            <div className="mb-16 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-600/40 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-sm">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Ready to Compete?</h3>
                <p className="text-slate-300">Create your account and join tournaments today</p>
              </div>
              <button
                onClick={() => navigate('/member-auth')}
                className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 font-bold rounded-xl hover:from-yellow-300 hover:to-orange-300 transition whitespace-nowrap"
              >
                Sign In Now
              </button>
            </div>
          ) : null}

          {/* Tournaments Display */}
          {tournaments.length > 0 ? (
            <div className="space-y-8">
              {tournaments.map((tournament, idx) => {
                const participantCount = (tournament.participants || []).length;
                const isUserRegistered = isRegistered(tournament._id);
                const isFull = participantCount >= tournament.maxParticipants;
                const canWithdraw = isUserRegistered && 
                  (tournament.status === 'upcoming' || tournament.status === 'registration');

                // Rotating accent colors
                const accentColors = [
                  { main: 'from-yellow-600 to-orange-600', light: 'yellow', text: 'text-yellow-400' },
                  { main: 'from-cyan-600 to-blue-600', light: 'cyan', text: 'text-cyan-400' },
                  { main: 'from-purple-600 to-pink-600', light: 'purple', text: 'text-purple-400' },
                  { main: 'from-green-600 to-emerald-600', light: 'green', text: 'text-green-400' },
                ];
                const accent = accentColors[idx % accentColors.length];

                return (
                  <div key={tournament._id} className={`group relative bg-gradient-to-r ${accent.main} rounded-3xl p-1 hover:p-1 transition`}>
                    <div className="bg-slate-900 rounded-3xl p-12 relative overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5 pointer-events-none">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_25%,rgba(68,68,68,.2)_50%,transparent_50%,transparent_75%,rgba(68,68,68,.2)_75%,rgba(68,68,68,.2))] bg-[length:40px_40px]"></div>
                      </div>

                      <div className="relative grid md:grid-cols-2 gap-16 items-center">
                        {/* Left - Main Info */}
                        <div>
                          <div className={`inline-block mb-6 px-4 py-2 rounded-full ${accent.text} font-bold text-sm bg-slate-800/60 border border-current/30`}>
                            {tournament.status.toUpperCase()}
                          </div>
                          
                          <h3 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                            {tournament.name}
                          </h3>
                          
                          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                            {tournament.description}
                          </p>

                          {/* Key Stats */}
                          <div className="grid grid-cols-3 gap-4 mb-10 pb-10 border-b border-slate-700/40">
                            <div>
                              <div className="text-sm text-slate-400 font-bold mb-2">FORMAT</div>
                              <div className={`text-2xl font-black ${accent.text}`}>{tournament.format.replace('-', ' ')}</div>
                            </div>
                            <div>
                              <div className="text-sm text-slate-400 font-bold mb-2">PLAYERS</div>
                              <div className={`text-2xl font-black ${isFull ? 'text-red-400' : accent.text}`}>
                                {participantCount}/{tournament.maxParticipants}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-slate-400 font-bold mb-2">STARTS</div>
                              <div className="text-2xl font-black text-slate-100">
                                {tournament.startDate instanceof Date 
                                  ? tournament.startDate.toLocaleDateString()
                                  : new Date(tournament.startDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>

                          {/* Participants */}
                          {participantCount > 0 && (
                            <div className="mb-8">
                              <div className="text-sm text-slate-400 font-bold mb-4">REGISTERED CHAMPIONS</div>
                              <div className="flex flex-wrap gap-3">
                                {(tournament.participants || []).slice(0, 6).map(p => (
                                  <div key={p._id} className="bg-slate-800/60 text-slate-100 px-4 py-2 rounded-full text-sm font-bold border border-slate-700/60 hover:border-slate-600 transition">
                                    {p.firstName}
                                  </div>
                                ))}
                                {participantCount > 6 && (
                                  <div className="bg-slate-800/60 text-slate-400 px-4 py-2 rounded-full text-sm font-bold border border-slate-700/60">
                                    +{participantCount - 6} more
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Right - Visual & Action */}
                        <div className="space-y-8">
                          {/* Visual Representation */}
                          <div className="relative h-80 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700/40 group/image">
                            <ChessImagePlaceholder icon={['♖', '♕', '♔', '♘'][idx % 4]} text={tournament.format} />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent opacity-60"></div>
                          </div>

                          {/* Progress Bar */}
                          <div>
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-sm text-slate-400 font-bold">REGISTRATION PROGRESS</span>
                              <span className={`text-lg font-black ${accent.text}`}>{Math.round((participantCount / tournament.maxParticipants) * 100)}%</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700/40">
                              <div 
                                className={`h-full rounded-full bg-gradient-to-r ${accent.main} transition-all duration-300`}
                                style={{ width: `${Math.min((participantCount / tournament.maxParticipants) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Action Button */}
                          {isUserRegistered ? (
                            <div className="space-y-3">
                              <button className="w-full bg-emerald-600/40 text-emerald-300 font-bold py-4 rounded-2xl border border-emerald-500/60 text-lg cursor-default hover:bg-emerald-600/50 transition">
                                ✓ YOU'RE REGISTERED
                              </button>
                              {canWithdraw && (
                                <button
                                  onClick={() => handleWithdraw(tournament._id)}
                                  className="w-full bg-red-600/40 hover:bg-red-500/40 text-red-300 font-bold py-3 rounded-2xl border border-red-500/60 transition"
                                >
                                  WITHDRAW
                                </button>
                              )}
                            </div>
                          ) : (
                            <button
                              onClick={() => handleRegister(tournament._id)}
                              disabled={isFull || tournament.status === 'completed' || tournament.status === 'in-progress'}
                              className={`w-full font-bold py-4 rounded-2xl text-lg transition transform hover:scale-105 border ${
                                isFull || tournament.status === 'completed' || tournament.status === 'in-progress'
                                  ? 'bg-slate-700/40 text-slate-500 cursor-not-allowed opacity-50 border-slate-700/30'
                                  : `bg-gradient-to-r ${accent.main} text-white hover:shadow-lg border-${accent.light}-400/30`
                              }`}
                            >
                              {isFull ? '❌ TOURNAMENT FULL' : tournament.status === 'completed' ? '✓ ENDED' : '♔ JOIN NOW'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="text-9xl mb-8 opacity-20">♔</div>
              <p className="text-3xl font-bold text-slate-200 mb-4">No Active Tournaments</p>
              <p className="text-lg text-slate-400">Check back soon for new competitions!</p>
            </div>
          )}
        </div>
      </div>

      {/* Your Tournaments Section */}
      {user && userType === 'member' && registeredTournaments.length > 0 && (
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 py-32 border-t border-slate-700/40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <span className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/40 text-blue-300 font-bold text-sm tracking-widest mb-6">
                ♕ YOUR TOURNAMENTS
              </span>
              <h2 className="text-6xl font-black text-white">Your <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Journey</span></h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {registeredTournaments.map((tournamentId, idx) => {
                const t = tournaments.find(trn => trn._id === tournamentId);
                const accentStyles = [
                  'border-blue-500/40 hover:border-blue-400/60 bg-blue-600/10',
                  'border-cyan-500/40 hover:border-cyan-400/60 bg-cyan-600/10',
                  'border-purple-500/40 hover:border-purple-400/60 bg-purple-600/10',
                ];
                const style = accentStyles[idx % accentStyles.length];

                return t ? (
                  <div key={t._id} className={`group relative bg-slate-800/60 border ${style} rounded-2xl p-10 hover:shadow-2xl transition backdrop-blur-sm`}>
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <h4 className="text-3xl font-black text-white mb-3">{t.name}</h4>
                        <p className={`text-sm font-bold ${
                          t.status === 'completed' ? 'text-emerald-400' : 
                          t.status === 'in-progress' ? 'text-yellow-400' : 
                          'text-blue-400'
                        }`}>
                          {t.status.replace('-', ' ').toUpperCase()}
                        </p>
                      </div>
                      <div className="text-5xl opacity-20">♞</div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 py-8 border-t border-b border-slate-700/40">
                      <div>
                        <div className="text-sm text-slate-400 font-bold mb-2">PARTICIPANTS</div>
                        <div className="text-2xl font-black text-blue-400">{(t.participants || []).length}/{t.maxParticipants}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-400 font-bold mb-2">FORMAT</div>
                        <div className="text-2xl font-black text-cyan-400">{t.format.replace('-', ' ')}</div>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-3">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition">
                        VIEW DETAILS
                      </button>
                      <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-100 font-bold py-3 rounded-xl transition">
                        MY PROGRESS
                      </button>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
