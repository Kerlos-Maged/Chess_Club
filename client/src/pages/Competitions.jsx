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
    <div className="w-full h-full bg-slate-800 flex items-center justify-center relative overflow-hidden">
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
    <div className="min-h-screen bg-white pt-16 md:pt-20 px-4 md:px-6">
      {/* Minimal Hero Section */}
      <div className="relative bg-slate-900 pt-12 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-amber-300 mb-4 uppercase tracking-widest">Competitions</p>
            <h1 className="text-5xl md:text-6xl font-bold text-amber-100 mb-6">Tournament Series 2026</h1>
            <p className="text-xl text-yellow-100 max-w-2xl mx-auto">Join competitive tournaments, challenge yourself, and climb the rankings</p>
          </div>
        </div>
      </div>

      {/* Auth Status Banner */}
      {!user && (
        <div className="bg-slate-800 border-b border-slate-700">
          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-amber-100">Ready to compete?</h3>
              <p className="text-yellow-100">Sign in to register for tournaments</p>
            </div>
            <button
              onClick={() => navigate('/member-auth')}
              className="px-8 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition whitespace-nowrap"
            >
              Sign In
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Tournaments Grid */}
        {tournaments.length > 0 ? (
          <div className="space-y-6">
            {tournaments.map((tournament, idx) => {
              const participantCount = (tournament.participants || []).length;
              const isUserRegistered = isRegistered(tournament._id);
              const isFull = participantCount >= tournament.maxParticipants;
              const canWithdraw = isUserRegistered && 
                (tournament.status === 'upcoming' || tournament.status === 'registration');

              const statusColors = {
                'upcoming': 'bg-green-900 text-green-300 border-green-600',
                'registration': 'bg-blue-900 text-blue-300 border-blue-600',
                'in-progress': 'bg-amber-900 text-amber-300 border-amber-600',
                'completed': 'bg-slate-700 text-slate-300 border-slate-600',
              };

              return (
                <div key={tournament._id} className="bg-slate-800 rounded-xl shadow-2xl hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 overflow-hidden border border-slate-700">
                  <div className="p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Left - Info */}
                      <div>
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${statusColors[tournament.status] || statusColors.upcoming}`}>
                              {tournament.status.replace('-', ' ').toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-amber-100 mb-4">
                          {tournament.name}
                        </h3>

                        <p className="text-yellow-100 mb-8 leading-relaxed">
                          {tournament.description}
                        </p>

                        {/* Key Information */}
                        <div className="space-y-4 mb-8 pb-8 border-b border-slate-700">
                          <div className="grid grid-cols-2 gap-8">
                            <div>
                              <p className="text-sm text-yellow-200 font-semibold mb-1">Format</p>
                              <p className="text-lg font-semibold text-amber-100">{tournament.format.replace('-', ' ')}</p>
                            </div>
                            <div>
                              <p className="text-sm text-yellow-200 font-semibold mb-1">Start Date</p>
                              <p className="text-lg font-semibold text-amber-100">
                                {tournament.startDate instanceof Date 
                                  ? tournament.startDate.toLocaleDateString()
                                  : new Date(tournament.startDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-yellow-200 font-semibold mb-1">Spots Available</p>
                              <p className={`text-lg font-semibold ${isFull ? 'text-red-400' : 'text-amber-100'}`}>
                                {Math.max(0, tournament.maxParticipants - participantCount)}/{tournament.maxParticipants}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-yellow-200 font-semibold mb-1">Current Players</p>
                              <p className="text-lg font-semibold text-amber-100">{participantCount} registered</p>
                            </div>
                          </div>
                        </div>

                        {/* Participants List */}
                        {participantCount > 0 && (
                          <div>
                            <p className="text-sm text-yellow-200 font-semibold mb-3">Registered Players</p>
                            <div className="flex flex-wrap gap-2">
                              {(tournament.participants || []).slice(0, 8).map(p => (
                                <span key={p._id} className="px-3 py-1 bg-slate-700 text-yellow-100 rounded-full text-sm font-medium shadow-md">
                                  {p.firstName}
                                </span>
                              ))}
                              {participantCount > 8 && (
                                <span className="px-3 py-1 bg-slate-700 text-yellow-200 rounded-full text-sm font-medium shadow-md">
                                  +{participantCount - 8} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right - Visual & Action */}
                      <div className="flex flex-col justify-between">
                        {/* Visual */}
                        <div className="bg-slate-750 rounded-xl p-12 mb-6 min-h-48 flex items-center justify-center border border-slate-700 shadow-inner">
                          <div className="text-center">
                            <div className="text-7xl mb-4 drop-shadow-lg">{'♔♕♖♗♘♙'[idx % 6]}</div>
                            <p className="text-yellow-100 font-semibold">{tournament.format}</p>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="mb-6 bg-slate-700/50 rounded-lg p-4 shadow-md">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-sm text-amber-300 font-semibold">Registration</p>
                            <p className="text-sm font-semibold text-amber-300">
                              {Math.round((participantCount / tournament.maxParticipants) * 100)}%
                            </p>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-600 shadow-inner">
                            <div 
                              className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-300 shadow-lg"
                              style={{ width: `${Math.min((participantCount / tournament.maxParticipants) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 bg-slate-700/50 rounded-lg p-4 shadow-md">
                          {isUserRegistered ? (
                            <>
                              <button className="w-full bg-slate-700 text-amber-300 font-semibold py-3 rounded-lg cursor-default border-2 border-amber-500 shadow-lg hover:shadow-amber-500/30">
                                ✓ You're Registered
                              </button>
                              {canWithdraw && (
                                <button
                                  onClick={() => handleWithdraw(tournament._id)}
                                  className="w-full bg-red-900 text-red-200 font-semibold py-3 rounded-lg hover:bg-red-800 transition border-2 border-red-600 shadow-lg"
                                >
                                  Withdraw
                                </button>
                              )}
                            </>
                          ) : (
                            <button
                              onClick={() => handleRegister(tournament._id)}
                              disabled={isFull || tournament.status === 'completed' || tournament.status === 'in-progress'}
                              className={`w-full font-semibold py-3 rounded-lg transition border-2 shadow-lg ${
                                isFull || tournament.status === 'completed' || tournament.status === 'in-progress'
                                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed border-slate-600'
                                  : 'bg-amber-600 text-white hover:bg-amber-700 border-amber-600 hover:shadow-amber-600/50'
                              }`}
                            >
                              {isFull ? 'Tournament Full' : tournament.status === 'completed' ? 'Ended' : 'Register'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
            <div className="text-center py-16 bg-slate-800 rounded-xl border border-slate-700 shadow-lg">
            <p className="text-2xl font-semibold text-amber-100 mb-2">No tournaments available</p>
            <p className="text-yellow-100">Check back soon for upcoming events</p>
          </div>
        )}
      </div>

      {/* Your Registrations Section */}
      {user && userType === 'member' && registeredTournaments.length > 0 && (
        <div className="bg-slate-900 border-t border-slate-700 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-amber-100 mb-8">Your Registrations</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {registeredTournaments.map((tournamentId) => {
                const t = tournaments.find(trn => trn._id === tournamentId);
                return t ? (
                  <div key={t._id} className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl hover:shadow-amber-500/20 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-amber-100">{t.name}</h4>
                        <p className={`text-sm font-semibold ${
                          t.status === 'completed' ? 'text-yellow-200' : 
                          t.status === 'in-progress' ? 'text-amber-300' : 
                          'text-green-300'
                        }`}>
                          {t.status.replace('-', ' ').toUpperCase()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-4 bg-slate-700/50 rounded-lg p-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-yellow-200">Format</span>
                        <span className="font-semibold text-amber-100">{t.format.replace('-', ' ')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-yellow-200">Participants</span>
                        <span className="font-semibold text-amber-100">{(t.participants || []).length}/{t.maxParticipants}</span>
                      </div>
                    </div>

                    <button className="w-full px-4 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition text-sm shadow-lg">
                      View Details
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>
      )}

      {/* Previous Events Section */}
      <div className="bg-slate-900 border-t border-slate-700 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-100 mb-3">Previous Events</h2>
            <p className="text-yellow-100 font-medium">Relive the most exciting tournaments from our history</p>
          </div>

          {(() => {
            const pastTournaments = tournaments.filter(t => t.status === 'completed');
            if (pastTournaments.length > 0) {
              return (
                <div className="space-y-4">
                  {pastTournaments.map((tournament, idx) => {
                    const participantCount = (tournament.participants || []).length;
                    return (
                      <div key={tournament._id} className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg hover:shadow-amber-500/20 transition-all duration-300">
                        <div className="grid md:grid-cols-12 gap-6 items-center">
                          {/* Event Number and Icon */}
                          <div className="md:col-span-1 flex items-center justify-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center font-bold text-white shadow-lg">
                              {idx + 1}
                            </div>
                          </div>

                          {/* Event Info */}
                          <div className="md:col-span-5">
                            <h4 className="text-lg font-bold text-amber-100 mb-2">{tournament.name}</h4>
                            <div className="flex flex-wrap gap-4 text-sm text-yellow-200">
                              <span>📅 {tournament.startDate instanceof Date 
                                ? tournament.startDate.toLocaleDateString()
                                : new Date(tournament.startDate).toLocaleDateString()}</span>
                              <span>👥 {participantCount} players</span>
                              <span>♟️ {tournament.format.replace('-', ' ')}</span>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="md:col-span-3 grid grid-cols-2 gap-4">
                            <div className="bg-slate-700/70 border border-slate-600 rounded-lg p-4 text-center shadow-md">
                              <p className="text-xs text-yellow-200 font-semibold mb-1">Winner</p>
                              <p className="text-sm font-bold text-amber-300">TBD</p>
                            </div>
                            <div className="bg-slate-700/70 border border-slate-600 rounded-lg p-4 text-center shadow-md">
                              <p className="text-xs text-yellow-200 font-semibold mb-1">Award</p>
                              <p className="text-sm font-bold text-amber-300">$500</p>
                            </div>
                          </div>

                          {/* Action */}
                          <div className="md:col-span-3">
                            <button className="w-full px-4 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition text-sm shadow-lg border border-amber-500">
                              View Results
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            } else {
              return (
                <div className="text-center py-12 bg-slate-800 rounded-xl border border-slate-700 shadow-lg">
                  <p className="text-yellow-100">No previous events yet. Check back after the tournaments conclude!</p>
                </div>
              );
            }
          })()}
        </div>
      </div>
    </div>
  );
};
