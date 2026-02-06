import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fakeProfiles } from '../data/fakeData';
import { ChessKnightLoader } from '../components/ChessKnightLoader';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Leaderboard = () => {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('wins');
  const leaderboardRef = useScrollAnimation();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let sorted = [...fakeProfiles];
        if (sortBy === 'wins') {
          sorted.sort((a, b) => b.wins - a.wins);
        } else {
          sorted.sort((a, b) => b.winRate - a.winRate);
        }
        
        setLeaderboard(sorted.slice(0, 100));
      } catch (err) {
        setError('Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="flex justify-center">
          <ChessKnightLoader size="lg" text="Loading Rankings..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div ref={leaderboardRef} className="mb-16 scroll-animate">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold text-navy mb-4">Elite Rankings</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compete against the best players in our chess community. Rankings are updated based on wins and performance.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg mb-8">
              {error}
            </div>
          )}

          {/* Sort Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setSortBy('wins')}
              className={`px-8 py-3 rounded-lg font-bold transition transform hover:scale-105 ${
                sortBy === 'wins'
                  ? 'bg-blue text-white shadow-lg'
                  : 'bg-white text-navy hover:bg-gray-50 border-2 border-blue'
              }`}
            >
              Sort by Wins
            </button>
            <button
              onClick={() => setSortBy('winRate')}
              className={`px-8 py-3 rounded-lg font-bold transition transform hover:scale-105 ${
                sortBy === 'winRate'
                  ? 'bg-blue text-white shadow-lg'
                  : 'bg-white text-navy hover:bg-gray-50 border-2 border-blue'
              }`}
            >
              Sort by Win Rate
            </button>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {leaderboard.slice(0, 3).map((player, index) => {
            const medals = ['🥇', '🥈', '🥉'];
            const colors = [
              'from-gold to-yellow-500 shadow-2xl transform scale-105',
              'from-gray-400 to-gray-500 shadow-xl',
              'from-orange-400 to-orange-500'
            ];
            return (
              <div
                key={player._id}
                onClick={() => navigate(`/profile/${player.userId}`)}
                className={`bg-gradient-to-br ${colors[index]} text-white p-8 rounded-lg text-center transform transition hover:scale-105 stagger-${index + 1} animate-fade-in-up cursor-pointer`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-4">{medals[index]}</div>
                <div className="text-3xl font-bold mb-2">#{index + 1}</div>
                <h3 className="text-2xl font-bold mb-4 hover:opacity-80 transition">{player.firstName} {player.lastName}</h3>
                <div className="space-y-2 text-lg">
                  <p className="font-semibold">{player.wins} Wins</p>
                  <p className="opacity-90">{player.winRate}% Win Rate</p>
                  <p className="opacity-90">{player.totalGames} Games Played</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Leaderboard Table */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-navy to-blue text-white">
                  <th className="px-6 py-5 text-left font-bold text-lg">Rank</th>
                  <th className="px-6 py-5 text-left font-bold text-lg">Player</th>
                  <th className="px-6 py-5 text-center font-bold text-lg">Wins</th>
                  <th className="px-6 py-5 text-center font-bold text-lg">Losses</th>
                  <th className="px-6 py-5 text-center font-bold text-lg">Draws</th>
                  <th className="px-6 py-5 text-center font-bold text-lg">Win Rate</th>
                  <th className="px-6 py-5 text-center font-bold text-lg">Total Games</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((player, index) => (
                  <tr
                    key={player._id}
                    className={`border-b transition hover:bg-blue/5 ${
                      index < 3 ? 'bg-gold/5' : index % 2 === 0 ? 'bg-gray-50' : ''
                    }`}
                  >
                    <td className="px-6 py-5">
                      <span className="font-bold text-lg text-navy">
                        {index === 0
                          ? '🥇'
                          : index === 1
                          ? '🥈'
                          : index === 2
                          ? '🥉'
                          : `#${index + 1}`}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div
                        className="cursor-pointer group"
                        onClick={() => navigate(`/profile/${player.userId}`)}
                      >
                        <p className="font-bold text-blue text-lg group-hover:text-navy transition underline decoration-dashed hover:decoration-solid">
                          {player.firstName} {player.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{player.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-block bg-green-100 text-green-700 font-bold px-4 py-2 rounded-lg">
                        {player.wins}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-block bg-red-100 text-red-700 font-bold px-4 py-2 rounded-lg">
                        {player.losses}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-block bg-gray-100 text-gray-700 font-bold px-4 py-2 rounded-lg">
                        {player.draws}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-block bg-blue-100 text-blue font-bold px-4 py-2 rounded-lg text-lg">
                        {player.winRate}%
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="font-semibold text-navy text-lg">{player.totalGames}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {leaderboard.length === 0 && !error && (
          <div className="bg-white rounded-xl shadow-lg p-16 text-center border border-gray-200">
            <p className="text-gray-500 text-xl">No players in the leaderboard yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

