import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fakeTournaments } from '../data/fakeData';
import { ChessKnightLoader } from '../components/ChessKnightLoader';

export const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        setTournaments(fakeTournaments);
      } catch (err) {
        console.error('Failed to load tournaments');
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  const filteredTournaments = tournaments.filter(t => {
    if (filter === 'upcoming') return t.status === 'registration';
    if (filter === 'ongoing') return t.status === 'in-progress';
    if (filter === 'completed') return t.status === 'completed';
    return true;
  });

  const getStatusColor = (status) => {
    if (status === 'registration') return 'bg-blue/10 border-blue';
    if (status === 'in-progress') return 'bg-gold/10 border-gold';
    if (status === 'completed') return 'bg-green-100 border-green-500';
    return 'bg-gray-100 border-gray-300';
  };

  const getStatusBadge = (status) => {
    if (status === 'registration') return 'Registration Open';
    if (status === 'in-progress') return 'In Progress';
    if (status === 'completed') return 'Completed';
    return 'Cancelled';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg py-20">
        <div className="flex justify-center">
          <ChessKnightLoader size="lg" text="Loading Tournaments..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-navy mb-4">🏆 Chess Tournaments</h1>
          <p className="text-gray-600 text-lg">
            Compete in exciting tournaments with random bracket generation and automatic progression
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          {['all', 'upcoming', 'ongoing', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-3 rounded-lg font-bold transition whitespace-nowrap ${
                filter === status
                  ? 'bg-navy text-white'
                  : 'bg-white text-navy hover:bg-gray-100'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Tournaments List */}
        <div className="space-y-6">
          {filteredTournaments.length > 0 ? (
            filteredTournaments.map(tournament => (
              <div
                key={tournament._id}
                className={`border-l-4 rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition ${getStatusColor(
                  tournament.status
                )}`}
                onClick={() => setSelectedTournament(tournament)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-navy mb-2">{tournament.name}</h2>
                    <p className="text-gray-600">{tournament.description}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full font-bold text-white ${
                    tournament.status === 'registration' ? 'bg-blue' :
                    tournament.status === 'in-progress' ? 'bg-gold text-navy' :
                    'bg-green-600'
                  }`}>
                    {getStatusBadge(tournament.status)}
                  </span>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-600">Format</p>
                    <p className="font-bold text-navy capitalize">{tournament.format.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Participants</p>
                    <p className="font-bold text-navy">{tournament.registeredParticipants.length}/{tournament.maxParticipants}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Start Date</p>
                    <p className="font-bold text-navy">{new Date(tournament.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Location</p>
                    <p className="font-bold text-navy">{tournament.location}</p>
                  </div>
                </div>

                {tournament.winner && (
                  <div className="bg-gold/20 rounded p-3 mb-4">
                    <p className="text-sm text-gray-600">Champion</p>
                    <p className="font-bold text-navy">🥇 {tournament.winner.firstName} {tournament.winner.lastName}</p>
                  </div>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTournament(tournament);
                  }}
                  className="text-blue hover:text-navy font-bold transition"
                >
                  View Details →
                </button>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <p className="text-gray-500 text-lg">No tournaments found with this filter</p>
            </div>
          )}
        </div>
      </div>

      {/* Tournament Details Modal */}
      {selectedTournament && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-navy to-blue text-white p-6 sticky top-0">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedTournament.name}</h2>
                  <p className="text-gray-200">{selectedTournament.description}</p>
                </div>
                <button
                  onClick={() => setSelectedTournament(null)}
                  className="text-2xl font-bold hover:text-gold transition"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Tournament Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-navy mb-4">📋 Tournament Info</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Format:</strong> {selectedTournament.format.replace('-', ' ')}</p>
                    <p><strong>Max Participants:</strong> {selectedTournament.maxParticipants}</p>
                    <p><strong>Location:</strong> {selectedTournament.location}</p>
                    <p><strong>Entry Fee:</strong> ${selectedTournament.entryFee}</p>
                    <p><strong>Status:</strong> {getStatusBadge(selectedTournament.status)}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy mb-4">🎁 Prizes</h3>
                  <div className="space-y-2">
                    {selectedTournament.prizes.map((prize, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                        <span className="font-bold text-navy">{prize.place}</span>
                        <span className="text-gold">{prize.reward}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Participants */}
              <div>
                <h3 className="text-xl font-bold text-navy mb-4">👥 Participants ({selectedTournament.registeredParticipants.length}/{selectedTournament.maxParticipants})</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedTournament.registeredParticipants.map((participant, idx) => (
                    <div key={idx} className="bg-gray-50 rounded p-3">
                      <p className="font-bold text-navy">{participant.firstName} {participant.lastName}</p>
                      <p className="text-xs text-gray-600">{participant.email}</p>
                      <p className="text-sm font-bold text-blue">Rating: {participant.rating}</p>
                    </div>
                  ))}
                </div>

                {selectedTournament.status === 'registration' && selectedTournament.registeredParticipants.length < selectedTournament.maxParticipants && (
                  <button className="mt-4 w-full bg-blue text-white font-bold py-3 rounded-lg hover:bg-navy transition">
                    Register for Tournament
                  </button>
                )}
              </div>

              {/* Tournament Bracket */}
              {selectedTournament.rounds && selectedTournament.rounds.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-navy mb-4">🎯 Tournament Bracket</h3>
                  <div className="space-y-6">
                    {selectedTournament.rounds.map((round, roundIdx) => (
                      <div key={roundIdx} className="bg-gray-50 rounded p-4">
                        <h4 className="font-bold text-navy mb-4">
                          {round.roundName} 
                          <span className={`ml-2 px-2 py-1 text-xs rounded ${
                            round.status === 'completed' ? 'bg-green-100 text-green-700' :
                            round.status === 'in-progress' ? 'bg-gold/20 text-navy' :
                            'bg-gray-200 text-gray-700'
                          }`}>
                            {round.status}
                          </span>
                        </h4>
                        <div className="space-y-3">
                          {round.matchups.map((matchup, matchIdx) => (
                            <div key={matchIdx} className="bg-white border rounded p-3">
                              {matchup.player1 && matchup.player2 ? (
                                <div className="space-y-2">
                                  <div className={`p-2 rounded ${matchup.winner?.userId === matchup.player1.userId ? 'bg-green-100 border-l-4 border-green-500' : 'bg-gray-100'}`}>
                                    <div className="flex justify-between items-center">
                                      <span className="font-bold">{matchup.player1.name}</span>
                                      <span className="text-xs text-gray-600">Rating: {matchup.player1.rating}</span>
                                    </div>
                                  </div>
                                  <div className="text-center text-gray-400">vs</div>
                                  <div className={`p-2 rounded ${matchup.winner?.userId === matchup.player2.userId ? 'bg-green-100 border-l-4 border-green-500' : 'bg-gray-100'}`}>
                                    <div className="flex justify-between items-center">
                                      <span className="font-bold">{matchup.player2.name}</span>
                                      <span className="text-xs text-gray-600">Rating: {matchup.player2.rating}</span>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="p-2 bg-green-100 rounded border-l-4 border-green-500">
                                  <span className="font-bold">🥇 {matchup.player1.name}</span>
                                  <span className="text-xs text-gray-600 ml-2">(Bye to next round)</span>
                                </div>
                              )}
                              {matchup.status === 'completed' && matchup.winner && (
                                <p className="text-xs text-green-700 mt-2">✓ Winner: {matchup.winner.name}</p>
                              )}
                              {matchup.notes && (
                                <p className="text-xs text-gray-600 mt-2 italic">{matchup.notes}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Winner */}
              {selectedTournament.winner && (
                <div className="bg-gradient-to-r from-gold to-yellow-400 text-navy rounded-lg p-6 text-center">
                  <p className="text-sm mb-2">TOURNAMENT CHAMPION</p>
                  <p className="text-3xl font-bold">🥇 {selectedTournament.winner.firstName} {selectedTournament.winner.lastName}</p>
                  <p className="text-sm mt-2">Rating: {selectedTournament.winner.rating}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
