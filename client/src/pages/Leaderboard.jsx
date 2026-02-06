import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fakeProfiles } from '../data/fakeData';
import { ChessKnightLoader, ChessAnimation } from '../components/Common';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { AuthContext } from '../context/AuthContext';

export const Leaderboard = () => {
  const navigate = useNavigate();
  const { user, userType } = useContext(AuthContext);
  const [activeCategory, setActiveCategory] = useState('overall');
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('wins');
  const [hoveredRank, setHoveredRank] = useState(null);
  const leaderboardRef = useScrollAnimation();

  // Image placeholder component with chess theme
  const ChessImagePlaceholder = ({ icon, text }) => (
    <div className="w-full h-full bg-gradient-to-br from-slate-700/30 via-slate-800/20 to-amber-700/20 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full flex items-center justify-center text-9xl animate-pulse">{icon}</div>
      </div>
      <div className="text-center z-10">
        <div className="text-8xl mb-4 animate-bounce">{icon}</div>
        <p className="text-white font-bold text-xl drop-shadow-lg">{text}</p>
      </div>
    </div>
  );

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filtered = [...fakeProfiles];

        // Filter by category
        if (activeCategory === 'grade') {
          filtered = filtered.filter(p => p.grade === '12');
        } else if (activeCategory === 'experience') {
          filtered = filtered.filter(p => p.experience === 'advanced');
        }
        // 'overall' shows all profiles

        // Sort by criteria
        if (sortBy === 'wins') {
          filtered.sort((a, b) => b.wins - a.wins);
        } else if (sortBy === 'winRate') {
          filtered.sort((a, b) => b.winRate - a.winRate);
        } else if (sortBy === 'rating') {
          filtered.sort((a, b) => b.rating - a.rating);
        }
        
        setLeaderboard(filtered.slice(0, 100));
      } catch (err) {
        setError('Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [sortBy, activeCategory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white py-20">
        <div className="flex justify-center">
          <ChessKnightLoader size="lg" text="Loading Rankings..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white">
      {/* Hero Banner with Image */}
      <div className="relative h-80 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 overflow-hidden mb-12">
        <ChessImagePlaceholder icon="♛" text="Elite Chess Rankings" />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <ChessAnimation type="floatingChessPiece" piece="♛" size="60px" />
            <h1 className="text-6xl font-bold drop-shadow-lg">Elite Rankings</h1>
            <ChessAnimation type="floatingChessPiece" piece="♚" size="60px" />
          </div>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto drop-shadow">
            Compete against the best players in our chess community. Rankings are updated based on performance metrics.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div ref={leaderboardRef} className="mb-12 scroll-animate">

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg mb-8">
              {error}
            </div>
          )}

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <button
              onClick={() => setActiveCategory('overall')}
              className={`px-6 py-3 rounded-lg font-bold transition transform hover:scale-105 shadow-md ${
                activeCategory === 'overall'
                  ? 'bg-slate-800 text-white shadow-lg scale-105'
                  : 'bg-white text-slate-900 hover:bg-slate-100 border-2 border-slate-800 hover:shadow-lg'
              }`}
            >
              ♔ Overall Rankings
            </button>
            <button
              onClick={() => setActiveCategory('grade')}
              className={`px-6 py-3 rounded-lg font-bold transition transform hover:scale-105 shadow-md ${
                activeCategory === 'grade'
                  ? 'bg-amber-700 text-white shadow-lg scale-105'
                  : 'bg-white text-slate-900 hover:bg-amber-50 border-2 border-amber-700 hover:shadow-lg'
              }`}
            >
              ♕ Grade 12 Elite
            </button>
            <button
              onClick={() => setActiveCategory('experience')}
              className={`px-6 py-3 rounded-lg font-bold transition transform hover:scale-105 shadow-md ${
                activeCategory === 'experience'
                  ? 'bg-slate-700 text-white shadow-lg scale-105'
                  : 'bg-white text-slate-900 hover:bg-slate-100 border-2 border-slate-700 hover:shadow-lg'
              }`}
            >
              ♞ Advanced Players
            </button>
          </div>

          {/* Sort Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSortBy('wins')}
              className={`px-6 py-2 rounded-lg font-bold transition text-sm transform hover:scale-105 shadow ${
                sortBy === 'wins'
                  ? 'bg-slate-800 text-white shadow-lg scale-105'
                  : 'bg-white text-slate-900 hover:bg-slate-100 border border-slate-800'
              }`}
            >
              ♖ Most Wins
            </button>
            <button
              onClick={() => setSortBy('winRate')}
              className={`px-6 py-2 rounded-lg font-bold transition text-sm transform hover:scale-105 shadow ${
                sortBy === 'winRate'
                  ? 'bg-slate-800 text-white shadow-lg scale-105'
                  : 'bg-white text-slate-900 hover:bg-slate-100 border border-slate-800'
              }`}
            >
              ♗ Highest Win Rate
            </button>
            <button
              onClick={() => setSortBy('rating')}
              className={`px-6 py-2 rounded-lg font-bold transition text-sm transform hover:scale-105 shadow ${
                sortBy === 'rating'
                  ? 'bg-slate-800 text-white shadow-lg scale-105'
                  : 'bg-white text-slate-900 hover:bg-slate-100 border border-slate-800'
              }`}
            >
              ♘ Highest Rating
            </button>
          </div>
        </div>

        {/* Category Info */}
        <div className="bg-gradient-to-r from-slate-700/10 to-amber-700/10 border-l-4 border-slate-800 rounded-lg p-6 mb-8">
          {activeCategory === 'overall' && (
            <p className="text-slate-900 font-semibold">♔ Showing top players across all grades and experience levels</p>
          )}
          {activeCategory === 'grade' && (
            <p className="text-slate-900 font-semibold">♕ Showing only Grade 12 students - the senior class elite</p>
          )}
          {activeCategory === 'experience' && (
            <p className="text-slate-900 font-semibold">♞ Showing only Advanced players - the most skilled members</p>
          )}
          <p className="text-sm text-gray-600 mt-2">Total Players: {leaderboard.length}</p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {leaderboard.slice(0, 3).map((player, index) => {
            const medals = ['♕', '♗', '♘'];
            const colors = [
              'from-amber-700 via-amber-600 to-amber-700 shadow-2xl transform scale-105',
              'from-gray-400 via-gray-500 to-gray-600 shadow-xl',
              'from-slate-700 via-slate-800 to-slate-900'
            ];
            const heights = ['h-96', 'h-80', 'h-72'];
            return (
              <div
                key={player._id}
                onClick={() => navigate(`/profile/${player.userId}`)}
                className={`bg-gradient-to-br ${colors[index]} text-white p-8 rounded-2xl text-center transform transition hover:scale-110 hover:shadow-2xl cursor-pointer border-4 border-white/30 relative overflow-hidden ${heights[index]}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredRank(index)}
                onMouseLeave={() => setHoveredRank(null)}
              >
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 opacity-20 text-8xl">♔</div>
                <div className="absolute bottom-0 left-0 opacity-20 text-8xl">♚</div>
                
                <div className="relative z-10">
                  <div className="text-6xl mb-4 animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>{medals[index]}</div>
                  <div className="text-4xl font-black mb-2">#{index + 1}</div>
                  <h3 className="text-2xl font-bold mb-4 hover:opacity-90 transition">{player.firstName} {player.lastName}</h3>
                  <div className={`space-y-2 text-lg transition transform ${hoveredRank === index ? 'scale-105' : ''}`}>
                    <p className="font-bold text-2xl">{player.wins} 🎯 Wins</p>
                    <p className="opacity-95">{player.winRate}% Win Rate</p>
                    <p className="opacity-95">{player.totalGames} Games Played</p>
                    <p className="text-sm opacity-85">Rating: {player.rating}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Leaderboard Table */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-200 hover:shadow-3xl transition">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
                  <th className="px-6 py-6 text-left font-bold text-lg">Rank</th>
                  <th className="px-6 py-6 text-left font-bold text-lg">Player</th>
                  <th className="px-6 py-6 text-center font-bold text-lg">♖ Wins</th>
                  <th className="px-6 py-6 text-center font-bold text-lg">♗ Losses</th>
                  <th className="px-6 py-6 text-center font-bold text-lg">♘ Draws</th>
                  <th className="px-6 py-6 text-center font-bold text-lg">♕ Win Rate</th>
                  <th className="px-6 py-6 text-center font-bold text-lg">♔ Total Games</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((player, index) => (
                  <tr
                    key={player._id}
                    className={`border-b transition hover:bg-gradient-to-r hover:from-slate-700/10 hover:to-amber-700/10 hover:shadow-md cursor-pointer ${
                      index < 3 ? 'bg-gradient-to-r from-amber-700/20 to-amber-700/10 border-b-2 border-amber-700' : index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                    onMouseEnter={() => setHoveredRank(index)}
                    onMouseLeave={() => setHoveredRank(null)}
                  >
                    <td className="px-6 py-5">
                      <span className="font-bold text-lg text-slate-900 inline-block transform transition hover:scale-125">
                        {index === 0
                          ? '♕'
                          : index === 1
                          ? '♖'
                          : index === 2
                          ? '♗'
                          : `#${index + 1}`}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div
                        className="cursor-pointer group"
                        onClick={() => navigate(`/profile/${player.userId}`)}
                      >
                        <p className={`font-bold text-lg group-hover:text-amber-700 transition underline decoration-dashed hover:decoration-solid ${hoveredRank === index ? 'text-slate-800' : 'text-slate-900'}`}>
                          {player.firstName} {player.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{player.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-block bg-gradient-to-r from-green-100 to-green-200 text-green-700 font-bold px-4 py-2 rounded-lg shadow-sm">
                        {player.wins}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-block bg-gradient-to-r from-red-100 to-red-200 text-red-700 font-bold px-4 py-2 rounded-lg shadow-sm">
                        {player.losses}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-block bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-bold px-4 py-2 rounded-lg shadow-sm">
                        {player.draws}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-block bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700 font-bold px-4 py-2 rounded-lg shadow-sm text-lg">
                        {player.winRate}%
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="font-bold text-slate-900 text-lg">{player.totalGames}</span>
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

