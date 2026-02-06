import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ChessAnimation } from '../components/Common';

export const CompetitionsTournamentHall = () => {
  const navigate = useNavigate();
  const { user, userType, token } = useContext(AuthContext);
  const [tournaments, setTournaments] = useState([]);
  const [registeredTournaments, setRegisteredTournaments] = useState([]);
  const [filter, setFilter] = useState('all');

  const ChessImagePlaceholder = ({ icon, text }) => (
    <div className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full flex items-center justify-center text-8xl">{icon}</div>
      </div>
      <div className="text-center z-10">
        <div className="text-6xl mb-3">{icon}</div>
        <p className="text-yellow-300 font-bold text-lg">{text}</p>
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
      navigate('/member-auth');
      return;
    }

    const tournament = tournaments.find(t => t._id === tournamentId);
    if (!tournament) return;

    if ((tournament.participants || []).find(p => p._id === user._id)) {
      alert('✓ Already registered!');
      return;
    }

    if ((tournament.participants || []).length >= tournament.maxParticipants) {
      alert('❌ Tournament is full!');
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
    alert('✓ Registered!');
  };

  const isRegistered = (tournamentId) => registeredTournaments.includes(tournamentId);

  // Chess notation watermark
  const ChessNotationBg = () => (
    <div className="absolute inset-0 opacity-5 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 text-xs text-yellow-600 font-mono">
        {[...Array(100)].map((_, i) => (
          <div key={i} className="inline-block mr-8 mb-4">
            {['e4', 'Nf3', 'c4', 'd4', 'Bg5', 'Be7', 'O-O', 'Nc6', 'Kg1', 'Qe1'][i % 10]}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950 relative overflow-hidden">
      <ChessNotationBg />

      {/* Hero */}
      <div className="relative pt-32 pb-24 border-b-2 border-yellow-500/40">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block mb-6 px-6 py-3 border-2 border-yellow-500 rounded-full">
            <span className="text-yellow-400 font-bold tracking-widest text-sm">🏛️ TOURNAMENT HALL</span>
          </div>
          <h1 className="text-7xl md:text-8xl font-black text-white mb-6 tracking-tighter">
            OFFICIAL <span className="text-yellow-400">CHAMPIONSHIPS</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">The most prestigious chess competitions</p>

          {/* Next Event Countdown */}
          {tournaments.length > 0 && (
            <div className="mt-12 inline-block border-2 border-yellow-500/50 rounded-lg p-8 bg-black/40 backdrop-blur-sm">
              <p className="text-yellow-400 text-sm font-bold mb-2">NEXT EVENT IN</p>
              <p className="text-4xl font-black text-white">15 DAYS</p>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="relative max-w-7xl mx-auto px-6 py-12 border-b border-yellow-500/20">
        <div className="flex flex-wrap gap-4">
          {['All', 'Tournament', 'Training', 'Social'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f.toLowerCase())}
              className={`px-6 py-3 rounded-lg font-bold transition ${
                filter === f.toLowerCase()
                  ? 'bg-yellow-500 text-black'
                  : 'border-2 border-yellow-500/40 text-yellow-400 hover:border-yellow-500'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Event */}
      {tournaments.length > 0 && (
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="relative bg-gradient-to-br from-yellow-500/10 to-transparent border-2 border-yellow-500 rounded-2xl overflow-hidden p-12">
            <div className="absolute top-6 right-6 text-6xl">♔</div>
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-yellow-600/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative grid md:grid-cols-3 gap-12 items-center">
              <div className="h-80 rounded-xl overflow-hidden border-2 border-yellow-500/40">
                <ChessImagePlaceholder icon="♖" text="Featured" />
              </div>
              
              <div className="md:col-span-2">
                <div className="inline-block mb-4 px-4 py-2 bg-yellow-500 text-black font-bold rounded-full text-sm">
                  ★ FEATURED EVENT ★
                </div>
                <h2 className="text-5xl font-black text-white mb-4">{tournaments[0]?.name}</h2>
                <p className="text-lg text-slate-300 mb-8">{tournaments[0]?.description}</p>
                
                <div className="grid grid-cols-3 gap-6 mb-8 p-6 border border-yellow-500/40 rounded-lg bg-black/40">
                  <div>
                    <p className="text-yellow-400 text-xs font-bold mb-2">DATE</p>
                    <p className="text-white font-bold">{new Date(tournaments[0]?.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 text-xs font-bold mb-2">PLAYERS</p>
                    <p className="text-white font-bold">{(tournaments[0]?.participants || []).length}/{tournaments[0]?.maxParticipants}</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 text-xs font-bold mb-2">FORMAT</p>
                    <p className="text-white font-bold capitalize">{tournaments[0]?.format}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleRegister(tournaments[0]._id)}
                  disabled={isRegistered(tournaments[0]._id)}
                  className={`px-10 py-4 rounded-lg font-bold text-lg ${
                    isRegistered(tournaments[0]._id)
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-yellow-500 text-black hover:bg-yellow-400'
                  }`}
                >
                  {isRegistered(tournaments[0]._id) ? '✓ REGISTERED' : 'REGISTER NOW'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tournament Grid */}
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-black text-white mb-12">ALL TOURNAMENTS</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tournaments.map((tournament, idx) => {
            const participantCount = (tournament.participants || []).length;
            const isUserRegistered = isRegistered(tournament._id);
            const isFull = participantCount >= tournament.maxParticipants;

            return (
              <div
                key={tournament._id}
                className="group relative bg-gradient-to-br from-slate-900 to-black border-2 border-yellow-500/40 hover:border-yellow-500 rounded-xl overflow-hidden transition-all hover:shadow-lg hover:shadow-yellow-500/20"
              >
                <div className="h-48 bg-gradient-to-br from-slate-800 to-black overflow-hidden">
                  <ChessImagePlaceholder icon={['♖', '♕', '♔', '♘'][idx % 4]} text={tournament.format} />
                </div>

                <div className="p-8 relative">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-black text-white flex-1">{tournament.name}</h3>
                    <span className="text-2xl">♔</span>
                  </div>

                  <div className="space-y-3 mb-6 pb-6 border-b border-yellow-500/20">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">DATE</span>
                      <span className="text-yellow-400 font-bold">{new Date(tournament.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">PLAYERS</span>
                      <span className={`font-bold ${isFull ? 'text-red-400' : 'text-yellow-400'}`}>
                        {participantCount}/{tournament.maxParticipants}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                      <div 
                        className="bg-yellow-500 h-full"
                        style={{ width: `${Math.min((participantCount / tournament.maxParticipants) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRegister(tournament._id)}
                    disabled={isFull || isUserRegistered}
                    className={`w-full py-3 rounded-lg font-bold transition ${
                      isUserRegistered
                        ? 'bg-emerald-600/40 text-emerald-300 border border-emerald-500'
                        : isFull
                        ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                        : 'bg-yellow-500 text-black hover:bg-yellow-400'
                    }`}
                  >
                    {isUserRegistered ? '✓ REGISTERED' : isFull ? '❌ FULL' : 'REGISTER'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="relative border-t border-yellow-500/20 py-12 text-center text-slate-400">
        <p>Official October Chess Club Tournament Series</p>
      </div>
    </div>
  );
};
