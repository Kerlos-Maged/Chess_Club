import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChessKnightLoader } from '../components/Common';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { AuthContext } from '../context/AuthContext';
import { staticProfiles } from '../data/staticData';

// Add fake data for leaderboard
const fakeLeaderboardData = [
  { _id: '1', userId: 'user1', firstName: 'Alice', lastName: 'Smith', wins: 50, winRate: 75, totalGames: 67, puzzlesSolved: 30, tournamentParticipations: 10, rating: 2000, experience: 'advanced', grade: '12' },
  { _id: '2', userId: 'user2', firstName: 'Bob', lastName: 'Johnson', wins: 45, winRate: 70, totalGames: 64, puzzlesSolved: 25, tournamentParticipations: 8, rating: 1950, experience: 'intermediate', grade: '11' },
  { _id: '3', userId: 'user3', firstName: 'Charlie', lastName: 'Brown', wins: 40, winRate: 65, totalGames: 62, puzzlesSolved: 20, tournamentParticipations: 7, rating: 1900, experience: 'beginner', grade: '10' },
  { _id: '4', userId: 'user4', firstName: 'Diana', lastName: 'Prince', wins: 35, winRate: 60, totalGames: 58, puzzlesSolved: 15, tournamentParticipations: 6, rating: 1850, experience: 'advanced', grade: '9' },
  { _id: '5', userId: 'user5', firstName: 'Eve', lastName: 'Adams', wins: 30, winRate: 55, totalGames: 55, puzzlesSolved: 10, tournamentParticipations: 5, rating: 1800, experience: 'intermediate', grade: '8' },
  { _id: '6', userId: 'alex123', firstName: 'Alex', lastName: 'Johnson', wins: 60, winRate: 80, totalGames: 75, puzzlesSolved: 40, tournamentParticipations: 12, rating: 2100, experience: 'advanced', grade: '12', image: 'https://via.placeholder.com/150' },
  { _id: '7', userId: 'aom456', firstName: 'Aom', lastName: 'Tanaka', wins: 55, winRate: 78, totalGames: 70, puzzlesSolved: 35, tournamentParticipations: 10, rating: 2050, experience: 'intermediate', grade: '11', image: 'https://via.placeholder.com/150' },
];

export const Leaderboard = () => {
  const navigate = useNavigate();
  const { user, userType } = useContext(AuthContext);
  const [leaderboardType, setLeaderboardType] = useState('wins'); // wins, puzzles, participations
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

        let filtered = [...fakeLeaderboardData];

        // Filter by category
        if (activeCategory === 'grade') {
          filtered = filtered.filter(p => p.grade === '12');
        } else if (activeCategory === 'experience') {
          filtered = filtered.filter(p => p.experience === 'advanced');
        }
        // 'overall' shows all profiles

        // Sort by leaderboard type
        if (leaderboardType === 'wins') {
          filtered.sort((a, b) => b.wins - a.wins);
        } else if (leaderboardType === 'puzzles') {
          filtered.sort((a, b) => b.puzzlesSolved - a.puzzlesSolved);
        } else if (leaderboardType === 'participations') {
          filtered.sort((a, b) => b.tournamentParticipations - a.tournamentParticipations);
        }

        setLeaderboard(filtered.slice(0, 100));
      } catch (err) {
        setError('Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [leaderboardType, activeCategory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white py-20">
        <div className="flex justify-center">
          <ChessKnightLoader size="lg" text="Loading Rankings..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-28">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-900/40 via-slate-900 to-indigo-900/40 overflow-hidden py-20 mb-12 border-b-2 border-blue-500/30">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-20">
          <div className="text-center">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-300 via-amber-100 to-indigo-300 bg-clip-text text-transparent mb-4 drop-shadow-lg">Elite Rankings</h1>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto">
              Compete against the best players in our chess community. Rankings are updated based on performance metrics.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Category Info */}
        <div className={`border rounded-xl p-6 mb-8 shadow-lg transition ${
          leaderboardType === 'wins'
            ? 'bg-slate-800/50 border-green-500/30'
            : leaderboardType === 'puzzles'
            ? 'bg-slate-800/50 border-blue-500/30'
            : 'bg-slate-800/50 border-indigo-500/30'
        }`}>
          <div className="mb-4">
            {activeCategory === 'overall' && (
              <p className="text-amber-100 font-semibold">♔ Showing top players across all grades and experience levels</p>
            )}
            {activeCategory === 'grade' && (
              <p className="text-amber-100 font-semibold">♕ Showing only Grade 12 students - the senior class elite</p>
            )}
            {activeCategory === 'experience' && (
              <p className="text-amber-100 font-semibold">♞ Showing only Advanced players - the most skilled members</p>
            )}
          </div>
          <div className="mb-2">
            {leaderboardType === 'wins' && (
              <p className="text-yellow-200 font-semibold">📊 Ranked by: Most Wins</p>
            )}
            {leaderboardType === 'puzzles' && (
              <p className="text-purple-300 font-semibold">🧩 Ranked by: Puzzles Solved</p>
            )}
            {leaderboardType === 'participations' && (
              <p className="text-orange-300 font-semibold">🎖️ Ranked by: Tournament Participations</p>
            )}
          </div>
          <p className="text-sm text-yellow-200">Total Players: {leaderboard.length}</p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {leaderboard.slice(0, 3).map((player, index) => {
            const medals = ['♕', '♖', '♗'];
            const colors = [
              'bg-slate-800 border-amber-500 shadow-amber-500/20',
              'bg-slate-800 border-slate-600 shadow-slate-600/20',
              'bg-slate-800 border-slate-600 shadow-slate-600/20'
            ];
            const heights = ['h-96', 'h-80', 'h-72'];
            return (
              <div
                key={player._id}
                onClick={() => navigate(`/profile/${player.userId}`)}
                className={`${colors[index]} text-white p-8 rounded-xl text-center transform transition hover:shadow-2xl cursor-pointer border-2 relative overflow-hidden ${heights[index]} shadow-xl`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredRank(index)}
                onMouseLeave={() => setHoveredRank(null)}
              >
                {/* Default Image */}
                <img
                  src={player.image || 'https://via.placeholder.com/150'}
                  alt={`${player.firstName} ${player.lastName}`}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white"
                />
                <div className="relative z-10">
                  <div className="text-6xl mb-4 animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>{medals[index]}</div>
                  <div className="text-4xl font-black mb-2">#{index + 1}</div>
                  <h3 className="text-2xl font-bold mb-4 hover:opacity-90 transition">{player.firstName} {player.lastName}</h3>
                  <div className={`space-y-2 text-lg transition transform ${hoveredRank === index ? 'scale-105' : ''}`}>
                    {leaderboardType === 'wins' && (
                      <>
                        <p className="font-bold text-2xl text-amber-300">{player.wins} 🎯 Wins</p>
                        <p className="text-yellow-200 opacity-95">{player.winRate}% Win Rate</p>
                        <p className="text-yellow-200 opacity-95">{player.totalGames} Games Played</p>
                        <p className="text-sm text-yellow-100 opacity-85">Rating: {player.rating}</p>
                      </>
                    )}
                    {leaderboardType === 'puzzles' && (
                      <>
                        <p className="font-bold text-2xl text-purple-300">{player.puzzlesSolved} 🧩 Puzzles</p>
                        <p className="text-yellow-200 opacity-95">Rating: {player.rating}</p>
                        <p className="text-yellow-200 opacity-95">{player.wins} Wins</p>
                        <p className="text-sm text-yellow-100 opacity-85">Experience: {player.experience}</p>
                      </>
                    )}
                    {leaderboardType === 'participations' && (
                      <>
                        <p className="font-bold text-2xl text-orange-300">{player.tournamentParticipations} 🏆 Tournaments</p>
                        <p className="text-yellow-200 opacity-95">{player.wins} Wins</p>
                        <p className="text-yellow-200 opacity-95">Experience: {player.experience}</p>
                        <p className="text-sm text-yellow-100 opacity-85">Grade: {player.grade}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Leaderboard Table */}
        <div className={`rounded-xl shadow-2xl overflow-hidden border transition ${
          leaderboardType === 'wins' 
            ? 'bg-slate-800/50 border-green-500/30 hover:shadow-green-500/20'
            : leaderboardType === 'puzzles'
            ? 'bg-slate-800/50 border-blue-500/30 hover:shadow-blue-500/20'
            : 'bg-slate-800/50 border-indigo-500/30 hover:shadow-indigo-500/20'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`text-white ${
                  leaderboardType === 'wins'
                    ? 'bg-gradient-to-r from-slate-900 to-green-900/30'
                    : leaderboardType === 'puzzles'
                    ? 'bg-gradient-to-r from-slate-900 to-blue-900/30'
                    : 'bg-gradient-to-r from-slate-900 to-indigo-900/30'
                }`}>
                  <th className="px-6 py-6 text-left font-bold text-lg">Rank</th>
                  <th className="px-6 py-6 text-left font-bold text-lg">Player</th>
                  {leaderboardType === 'wins' && (
                    <>
                      <th className="px-6 py-6 text-center font-bold text-lg">♖ Wins</th>
                      <th className="px-6 py-6 text-center font-bold text-lg">♗ Losses</th>
                      <th className="px-6 py-6 text-center font-bold text-lg">♘ Draws</th>
                      <th className="px-6 py-6 text-center font-bold text-lg">♕ Win Rate</th>
                      <th className="px-6 py-6 text-center font-bold text-lg">♔ Total Games</th>
                    </>
                  )}
                  {leaderboardType === 'puzzles' && (
                    <>
                      <th className="px-6 py-6 text-center font-bold text-lg">🧩 Puzzles Solved</th>
                      <th className="px-6 py-6 text-center font-bold text-lg">♕ Rating</th>
                      <th className="px-6 py-6 text-center font-bold text-lg">♖ Wins</th>
                    </>
                  )}
                  {leaderboardType === 'participations' && (
                    <>
                      <th className="px-6 py-6 text-center font-bold text-lg">🏆 Tournaments</th>
                      <th className="px-6 py-6 text-center font-bold text-lg">♖ Wins</th>
                      <th className="px-6 py-6 text-center font-bold text-lg">💪 Experience</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((player, index) => (
                  <tr
                    key={player._id}
                    className={`border-b border-slate-700 transition hover:bg-slate-700/50 hover:shadow-md cursor-pointer ${
                      index < 3 ? 'bg-slate-750/50 border-b border-amber-600/50' : index % 2 === 0 ? 'bg-slate-800' : 'bg-slate-800/50'
                    }`}
                    onMouseEnter={() => setHoveredRank(index)}
                    onMouseLeave={() => setHoveredRank(null)}
                  >
                    <td className="px-6 py-5">
                      <span className="font-bold text-lg text-amber-300 inline-block transform transition hover:scale-125">
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
                        <p className={`font-bold text-lg group-hover:text-amber-300 transition underline decoration-dashed hover:decoration-solid ${hoveredRank === index ? 'text-amber-100' : 'text-amber-100'}`}>
                          {player.firstName} {player.lastName}
                        </p>
                        <p className="text-sm text-yellow-200/60">{player.email}</p>
                      </div>
                    </td>
                    {leaderboardType === 'wins' && (
                      <>
                        <td className="px-6 py-5 text-center">
                          <span className="inline-block bg-slate-700 text-green-300 font-bold px-4 py-2 rounded-lg shadow-md">
                            {player.wins}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className="inline-block bg-slate-700 text-red-300 font-bold px-4 py-2 rounded-lg shadow-md">
                            {player.losses}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className="inline-block bg-slate-700 text-yellow-300 font-bold px-4 py-2 rounded-lg shadow-md">
                            {player.draws}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className="inline-block bg-slate-700 text-amber-300 font-bold px-4 py-2 rounded-lg shadow-md text-lg">
                            {player.winRate}%
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className="font-bold text-amber-100 text-lg">{player.totalGames}</span>
                        </td>
                      </>
                    )}
                    {leaderboardType === 'puzzles' && (
                      <>
                        <td className="px-6 py-5 text-center">
                          <span className="inline-block bg-slate-700 text-purple-300 font-bold px-4 py-2 rounded-lg shadow-md text-lg">
                            {player.puzzlesSolved}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className="inline-block bg-slate-700 text-cyan-300 font-bold px-4 py-2 rounded-lg shadow-md">
                            {player.rating}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className="inline-block bg-slate-700 text-green-300 font-bold px-4 py-2 rounded-lg shadow-md">
                            {player.wins}
                          </span>
                        </td>
                      </>
                    )}
                    {leaderboardType === 'participations' && (
                      <>
                        <td className="px-6 py-5 text-center">
                          <span className="inline-block bg-slate-700 text-orange-300 font-bold px-4 py-2 rounded-lg shadow-md text-lg">
                            {player.tournamentParticipations}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className="inline-block bg-slate-700 text-green-300 font-bold px-4 py-2 rounded-lg shadow-md">
                            {player.wins}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className="inline-block bg-slate-700 text-yellow-300 font-bold px-4 py-2 rounded-lg shadow-md capitalize">
                            {player.experience}
                          </span>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {leaderboard.length === 0 && !error && (
          <div className="bg-slate-800 rounded-xl shadow-lg p-16 text-center border border-slate-700">
            <p className="text-yellow-200 text-xl">No players in the leaderboard yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

