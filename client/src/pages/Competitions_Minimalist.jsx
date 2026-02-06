import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const CompetitionsMinimalist = () => {
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 py-24">
        <h1 className="text-7xl font-black text-black mb-2 tracking-tight">Tournaments</h1>
        <p className="text-lg text-slate-600">Upcoming chess competitions</p>
      </div>

      {/* Auth Banner */}
      {!user && (
        <div className="max-w-5xl mx-auto px-6 mb-16">
          <div className="border-2 border-black p-8 flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-black">Sign in to register</p>
              <p className="text-sm text-slate-700">Create an account to join tournaments</p>
            </div>
            <button
              onClick={() => navigate('/member-auth')}
              className="px-8 py-3 bg-black text-white font-bold hover:bg-slate-900 transition text-lg"
            >
              Sign In
            </button>
          </div>
        </div>
      )}

      {/* Tournament List */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        {tournaments.length > 0 ? (
          <div className="space-y-px border-t-2 border-black">
            {tournaments.map((tournament, idx) => {
              const participantCount = (tournament.participants || []).length;
              const isFull = participantCount >= tournament.maxParticipants;
              const isUserReg = isRegistered(tournament._id);
              const startDate = new Date(tournament.startDate);

              return (
                <div
                  key={tournament._id}
                  className="border-b-2 border-black py-8 flex items-center justify-between hover:bg-slate-50 px-6 -mx-6 transition group"
                >
                  {/* Left Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-black text-black mb-2">{tournament.name}</h3>
                    <p className="text-slate-600 mb-4">{tournament.description}</p>
                    
                    {/* Meta Info */}
                    <div className="flex gap-8 text-sm font-bold uppercase tracking-wide">
                      <div>
                        <p className="text-slate-500 text-xs mb-1">Date</p>
                        <p className="text-black">
                          {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs mb-1">Format</p>
                        <p className="text-black capitalize">{tournament.format}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs mb-1">Players</p>
                        <p className={`text-black ${isFull ? 'font-black' : ''}`}>
                          {participantCount}/{tournament.maxParticipants}
                          {isFull && ' (FULL)'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Button */}
                  <button
                    onClick={() => handleRegister(tournament._id)}
                    disabled={isFull || isUserReg}
                    className={`ml-8 px-8 py-3 font-black text-lg uppercase tracking-wider transition whitespace-nowrap ${
                      isUserReg
                        ? 'bg-slate-200 text-slate-600 cursor-default border-2 border-slate-400'
                        : isFull
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed border-2 border-slate-300'
                        : 'bg-black text-white border-2 border-black hover:bg-slate-900'
                    }`}
                  >
                    {isUserReg ? '✓ In' : isFull ? 'Full' : 'Join'}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 border-t-2 border-black">
            <p className="text-slate-600 text-lg">No tournaments available</p>
          </div>
        )}
      </div>
    </div>
  );
};
