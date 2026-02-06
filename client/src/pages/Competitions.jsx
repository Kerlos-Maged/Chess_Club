import React, { useState, useEffect } from 'react';
import { fakeProfiles } from '../data/fakeData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Competitions = () => {
  const competitionsRef = useScrollAnimation();
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [showBracket, setShowBracket] = useState(false);

  useEffect(() => {
    // Load tournaments from localStorage or create defaults
    const saved = localStorage.getItem('tournaments');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTournaments(parsed);
      } catch (error) {
        console.error('Error parsing tournaments from localStorage:', error);
        initializeDefaultTournaments();
      }
    } else {
      initializeDefaultTournaments();
    }
  }, []);

  const initializeDefaultTournaments = () => {
    const defaults = [
      {
        _id: '1',
        name: 'Spring Championship 2024',
        description: 'Main tournament of the season',
        maxParticipants: 8,
        participants: fakeProfiles.slice(0, 6),
        rounds: [],
        currentRound: 0,
        status: 'registration',
        startDate: new Date(Date.now() + 10 * 86400000),
        winner: null,
        format: 'single-elimination',
      },
      {
        _id: '2',
        name: 'Rapid Tournament',
        description: 'Quick games - 10 minutes per side',
        maxParticipants: 4,
        participants: [],
        rounds: [],
        currentRound: 0,
        status: 'upcoming',
        startDate: new Date(Date.now() + 5 * 86400000),
        winner: null,
        format: 'single-elimination',
      },
    ];
    setTournaments(defaults);
  };

  const startTournament = (tournamentId) => {
    const tournament = tournaments.find(t => t._id === tournamentId);
    if (tournament.participants.length < 2) {
      alert('Need at least 2 participants to start tournament');
      return;
    }

    const updatedTournament = {
      ...tournament,
      status: 'in-progress',
      rounds: generateRounds(tournament.participants),
      currentRound: 1,
    };

    setTournaments(tournaments.map(t => t._id === tournamentId ? updatedTournament : t));
    setSelectedTournament(updatedTournament);
    setShowBracket(true);
  };

  const generateRounds = (participants) => {
    if (participants.length === 0) return [];

    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    const rounds = [];

    // First round - Round 1
    const firstRound = {
      roundNumber: 1,
      name: 'Round 1',
      matches: [],
    };

    for (let i = 0; i < shuffled.length; i += 2) {
      if (i + 1 < shuffled.length) {
        firstRound.matches.push({
          id: `${Date.now()}-${i}`,
          player1: shuffled[i],
          player2: shuffled[i + 1],
          winner: null,
          status: 'pending',
        });
      }
    }
    rounds.push(firstRound);

    // Generate remaining rounds
    let remainingParticipants = firstRound.matches.length;
    let roundNumber = 2;

    while (remainingParticipants > 1) {
      const round = {
        roundNumber,
        name: getRoundName(remainingParticipants),
        matches: [],
      };

      for (let i = 0; i < remainingParticipants; i += 2) {
        if (i + 1 < remainingParticipants) {
          round.matches.push({
            id: `round${roundNumber}-match${i}`,
            player1: null,
            player2: null,
            winner: null,
            status: 'waiting',
          });
        }
      }

      rounds.push(round);
      remainingParticipants = round.matches.length;
      roundNumber++;
    }

    return rounds;
  };

  const getRoundName = (participantCount) => {
    if (participantCount === 2) return 'Final';
    if (participantCount === 4) return 'Semi-Final';
    if (participantCount === 8) return 'Quarter-Final';
    return `Round ${participantCount}`;
  };

  const setMatchWinner = (roundIndex, matchIndex, winner) => {
    if (!selectedTournament) return;

    const updatedTournament = { ...selectedTournament };
    const round = updatedTournament.rounds[roundIndex];
    const match = round.matches[matchIndex];

    match.winner = winner;
    match.status = 'completed';

    // Advance winner to next round
    if (roundIndex + 1 < updatedTournament.rounds.length) {
      const nextRound = updatedTournament.rounds[roundIndex + 1];
      const playerSlot = matchIndex < 2 ? 'player1' : 'player2';
      
      for (let i = 0; i < nextRound.matches.length; i++) {
        if (!nextRound.matches[i].player1) {
          nextRound.matches[i].player1 = winner;
          break;
        } else if (!nextRound.matches[i].player2) {
          nextRound.matches[i].player2 = winner;
          break;
        }
      }
      nextRound.matches = nextRound.matches.map(m => {
        if (m.player1 && m.player2) return { ...m, status: 'ready' };
        return m;
      });
    } else {
      updatedTournament.winner = winner;
      updatedTournament.status = 'completed';
      updatedTournament.currentRound = roundIndex + 2;
    }

    setSelectedTournament(updatedTournament);
    setTournaments(tournaments.map(t => t._id === updatedTournament._id ? updatedTournament : t));
  };

  const addParticipant = (tournamentId, participant) => {
    setTournaments(tournaments.map(t => {
      if (t._id === tournamentId && t.participants.length < t.maxParticipants) {
        return {
          ...t,
          participants: [...t.participants, participant],
        };
      }
      return t;
    }));
  };

  const removeParticipant = (tournamentId, participantId) => {
    setTournaments(tournaments.map(t => {
      if (t._id === tournamentId) {
        return {
          ...t,
          participants: t.participants.filter(p => p._id !== participantId),
        };
      }
      return t;
    }));
  };

  if (showBracket && selectedTournament) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={() => setShowBracket(false)}
            className="mb-6 bg-navy text-white px-6 py-3 rounded-lg hover:bg-blue transition font-bold"
          >
            ← Back to Tournaments
          </button>

          <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-200">
            <h1 className="text-5xl font-bold text-navy mb-2">{selectedTournament.name}</h1>
            <div className="mb-8 flex gap-4 items-center">
              <span className={`px-4 py-2 rounded-lg font-bold text-white text-lg ${
                selectedTournament.status === 'completed' ? 'bg-green-600' : 'bg-blue'
              }`}>
                {selectedTournament.status.toUpperCase()}
              </span>
              <span className="text-gray-600 text-lg">
                Round {selectedTournament.currentRound} / {selectedTournament.rounds.length}
              </span>
            </div>

            {selectedTournament.winner && (
              <div className="bg-gold/20 border-l-4 border-gold p-6 mb-8 rounded">
                <h2 className="text-2xl font-bold text-navy mb-2">🏆 Tournament Winner</h2>
                <p className="text-xl">
                  <strong>{selectedTournament.winner.firstName} {selectedTournament.winner.lastName}</strong>
                </p>
                <p className="text-gray-600">Rating: {selectedTournament.winner.rating}</p>
              </div>
            )}

            {/* Tournament Bracket */}
            <div className="space-y-8">
              {selectedTournament.rounds.map((round, roundIndex) => (
                <div key={roundIndex} className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-navy mb-6">{round.name}</h2>
                  <div className="space-y-4">
                    {round.matches.map((match, matchIndex) => (
                      <div
                        key={match.id}
                        className={`border-2 rounded-lg p-4 ${
                          match.status === 'completed'
                            ? 'border-green-500 bg-green-50'
                            : match.status === 'ready'
                            ? 'border-blue bg-blue/10'
                            : 'border-gray-300 bg-gray-100'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-bold text-gray-600">Match {matchIndex + 1}</h3>
                          <span className={`px-3 py-1 rounded text-sm font-bold text-white ${
                            match.status === 'completed' ? 'bg-green-500' : 'bg-gray-400'
                          }`}>
                            {match.status}
                          </span>
                        </div>

                        <div className="space-y-2">
                          {/* Player 1 */}
                          {match.player1 ? (
                            <button
                              onClick={() => setMatchWinner(roundIndex, matchIndex, match.player1)}
                              className={`w-full p-3 text-left rounded border-l-4 transition ${
                                match.winner?._id === match.player1._id
                                  ? 'bg-green-100 border-green-500 font-bold'
                                  : 'bg-white border-blue hover:bg-blue/5'
                              } ${match.status === 'completed' ? 'opacity-75' : 'cursor-pointer'}`}
                              disabled={match.status === 'completed'}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-bold">{match.player1.firstName} {match.player1.lastName}</p>
                                  <p className="text-sm text-gray-600">Rating: {match.player1.rating}</p>
                                </div>
                                {match.winner?._id === match.player1._id && <span className="text-2xl">✓</span>}
                              </div>
                            </button>
                          ) : (
                            <div className="p-3 bg-gray-100 rounded text-gray-400 italic">
                              Waiting for winner from previous round...
                            </div>
                          )}

                          {/* Player 2 */}
                          {match.player2 ? (
                            <button
                              onClick={() => setMatchWinner(roundIndex, matchIndex, match.player2)}
                              className={`w-full p-3 text-left rounded border-l-4 transition ${
                                match.winner?._id === match.player2._id
                                  ? 'bg-green-100 border-green-500 font-bold'
                                  : 'bg-white border-blue hover:bg-blue/5'
                              } ${match.status === 'completed' ? 'opacity-75' : 'cursor-pointer'}`}
                              disabled={match.status === 'completed'}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-bold">{match.player2.firstName} {match.player2.lastName}</p>
                                  <p className="text-sm text-gray-600">Rating: {match.player2.rating}</p>
                                </div>
                                {match.winner?._id === match.player2._id && <span className="text-2xl">✓</span>}
                              </div>
                            </button>
                          ) : (
                            <div className="p-3 bg-gray-100 rounded text-gray-400 italic">
                              Waiting for winner from previous round...
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div ref={competitionsRef} className="mb-12 scroll-animate">
          <h1 className="text-6xl font-bold text-navy mb-4 animate-fade-in-down">Elite Competitions</h1>
          <p className="text-xl text-gray-600 max-w-3xl animate-fade-in-down">
            Register for tournaments, compete against fellow players, and showcase your skills. Single-elimination format for fair and exciting matches.
          </p>
        </div>

        {tournaments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
            <p className="text-gray-600 mb-6 text-lg font-semibold">Loading tournaments...</p>
            <button
              onClick={() => initializeDefaultTournaments()}
              className="bg-blue text-white px-8 py-3 rounded-lg hover:bg-navy transition font-bold text-lg"
            >
              Load Default Tournaments
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
          {tournaments.map((tournament, idx) => (
            <div
              key={tournament._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition transform hover:scale-105 stagger-1 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className={`h-3 ${
                tournament.status === 'completed' ? 'bg-green-500' : 
                tournament.status === 'in-progress' ? 'bg-blue' : 'bg-gold'
              }`} />

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-navy mb-2">{tournament.name}</h2>
                    <p className="text-gray-600 text-sm">{tournament.description}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase whitespace-nowrap ml-4 ${
                    tournament.status === 'completed' ? 'bg-green-500 text-white' :
                    tournament.status === 'in-progress' ? 'bg-blue text-white' : 'bg-gold text-navy'
                  }`}>
                    {tournament.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6 py-4 border-y border-gray-200">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue">{tournament.participants.length}</p>
                    <p className="text-xs text-gray-600">Registered</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gold">{tournament.maxParticipants}</p>
                    <p className="text-xs text-gray-600">Max Slots</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{tournament.rounds.length}</p>
                    <p className="text-xs text-gray-600">Rounds</p>
                  </div>
                </div>

                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between text-gray-700">
                    <span>Format:</span>
                    <span className="font-bold capitalize">{tournament.format.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Starts:</span>
                    <span className="font-bold">{tournament.startDate.toLocaleDateString()}</span>
                  </div>
                </div>

                {tournament.status === 'registration' && (
                  <div className="mb-6">
                    <h3 className="font-bold text-navy mb-3">Available Players</h3>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {fakeProfiles
                        .filter(p => !tournament.participants.find(tp => tp._id === p._id))
                        .map(player => (
                          <button
                            key={player._id}
                            onClick={() => addParticipant(tournament._id, player)}
                            className="w-full text-left p-2 bg-gray-50 hover:bg-blue/10 rounded transition text-sm"
                          >
                            <span className="font-bold">{player.firstName} {player.lastName}</span>
                            <span className="text-gray-600 ml-2">({player.rating})</span>
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                {tournament.participants.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-bold text-navy mb-3">Registered Participants</h3>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {tournament.participants.map(p => (
                        <div
                          key={p._id}
                          className="flex justify-between items-center p-2 bg-blue/10 rounded text-sm"
                        >
                          <div>
                            <p className="font-bold">{p.firstName} {p.lastName}</p>
                            <p className="text-gray-600">Rating: {p.rating}</p>
                          </div>
                          {tournament.status === 'registration' && (
                            <button
                              onClick={() => removeParticipant(tournament._id, p._id)}
                              className="text-red-600 hover:text-red-800 font-bold"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  {tournament.status === 'registration' && (
                    <button
                      onClick={() => startTournament(tournament._id)}
                      className="flex-1 bg-gold text-navy font-bold py-3 rounded-lg hover:bg-yellow-400 transition disabled:opacity-50 text-lg"
                      disabled={tournament.participants.length < 2}
                    >
                      Start Tournament
                    </button>
                  )}
                  {tournament.status !== 'registration' && (
                    <button
                      onClick={() => {
                        setSelectedTournament(tournament);
                        setShowBracket(true);
                      }}
                      className="flex-1 bg-blue text-white font-bold py-3 rounded-lg hover:bg-navy transition text-lg"
                    >
                      View Bracket
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
};
