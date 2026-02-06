import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fakeProfiles } from '../data/fakeData';
import { ChessKnightLoader } from '../components/ChessKnightLoader';

export const Profile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('stats');
  const [searchUserId, setSearchUserId] = useState('');

  // Auto-load profile if userId is in URL
  useEffect(() => {
    if (userId) {
      loadProfile(userId);
    }
  }, [userId]);

  const loadProfile = async (id) => {
    setLoading(true);
    setError('');
    setProfile(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundProfile = fakeProfiles.find(p => p.userId.toLowerCase() === id.toLowerCase());
      
      if (foundProfile) {
        setProfile(foundProfile);
        setSearchUserId(id);
      } else {
        setError('Profile not found. Try: user_chess_001_alex, user_chess_002_jordan, user_chess_003_casey');
      }
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchUserId.trim()) {
      setError('Please enter a user ID');
      return;
    }

    loadProfile(searchUserId);
  };

  if (loading && !profile) {
    return (
      <div className="min-h-screen bg-bg py-20">
        <div className="flex justify-center">
          <ChessKnightLoader size="lg" text="Loading Profile..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-navy mb-6">Search Player Profile</h2>
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="text"
              value={searchUserId}
              onChange={(e) => setSearchUserId(e.target.value)}
              placeholder="Enter user ID (e.g., user_1234567890_abc123)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
            />
            <button
              type="submit"
              className="bg-blue text-white font-bold px-8 py-3 rounded-lg hover:bg-navy transition"
            >
              Search
            </button>
          </form>
          {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
        </div>

        {/* Profile View */}
        {profile && (
          <div className="space-y-8">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-navy to-blue text-white rounded-lg shadow-lg p-8">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">
                    {profile.firstName} {profile.lastName}
                  </h1>
                  <p className="text-gold text-lg font-semibold mb-4">ID: {profile.userId}</p>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-4xl font-bold text-gold">{profile.rating}</p>
                      <p className="text-sm text-gray-200">Rating</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold">{profile.wins}</p>
                      <p className="text-sm text-gray-200">Wins</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold">{profile.losses}</p>
                      <p className="text-sm text-gray-200">Losses</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold">{profile.winRate}%</p>
                      <p className="text-sm text-gray-200">Win Rate</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-300 mb-2">
                    Experience: <span className="text-gold capitalize">{profile.experience}</span>
                  </p>
                  <p className="text-gray-300 mb-2">
                    Grade: <span className="text-gold">{profile.grade}</span>
                  </p>
                  <p className="text-gray-300">
                    Joined: {new Date(profile.joinedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`flex-1 py-4 px-6 font-bold transition ${
                    activeTab === 'stats'
                      ? 'bg-blue text-white'
                      : 'bg-gray-50 text-navy hover:bg-gray-100'
                  }`}
                >
                  📊 Statistics
                </button>
                <button
                  onClick={() => setActiveTab('matches')}
                  className={`flex-1 py-4 px-6 font-bold transition ${
                    activeTab === 'matches'
                      ? 'bg-blue text-white'
                      : 'bg-gray-50 text-navy hover:bg-gray-100'
                  }`}
                >
                  🎮 Match History
                </button>
                <button
                  onClick={() => setActiveTab('achievements')}
                  className={`flex-1 py-4 px-6 font-bold transition ${
                    activeTab === 'achievements'
                      ? 'bg-blue text-white'
                      : 'bg-gray-50 text-navy hover:bg-gray-100'
                  }`}
                >
                  🏆 Achievements
                </button>
              </div>

              <div className="p-8">
                {/* Statistics Tab */}
                {activeTab === 'stats' && (
                  <div>
                    {profile.bio && (
                      <div className="mb-8">
                        <h3 className="text-xl font-bold text-navy mb-3">Bio</h3>
                        <p className="text-gray-700">{profile.bio}</p>
                      </div>
                    )}
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-blue/10 rounded-lg p-6 border-l-4 border-blue">
                        <p className="text-sm text-gray-600 mb-2">Total Games</p>
                        <p className="text-4xl font-bold text-navy">{profile.totalGames}</p>
                      </div>
                      <div className="bg-gold/10 rounded-lg p-6 border-l-4 border-gold">
                        <p className="text-sm text-gray-600 mb-2">Draws</p>
                        <p className="text-4xl font-bold text-gold">{profile.draws}</p>
                      </div>
                      <div className="bg-green-100 rounded-lg p-6 border-l-4 border-green-500">
                        <p className="text-sm text-gray-600 mb-2">Current Rating</p>
                        <p className="text-4xl font-bold text-green-600">{profile.rating}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Match History Tab */}
                {activeTab === 'matches' && (
                  <div>
                    {profile.matchHistory && profile.matchHistory.length > 0 ? (
                      <div className="space-y-4">
                        {profile.matchHistory.map((match, idx) => (
                          <div
                            key={idx}
                            className={`p-4 rounded-lg border-l-4 ${
                              match.result === 'win'
                                ? 'bg-green-50 border-green-500'
                                : match.result === 'loss'
                                ? 'bg-red-50 border-red-500'
                                : 'bg-gray-50 border-gray-400'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-bold text-navy mb-2">
                                  {match.result === 'win' ? '✓' : match.result === 'loss' ? '✗' : '='}{' '}
                                  vs. {match.opponent}
                                </h4>
                                <p className="text-sm text-gray-600 mb-1">{match.event}</p>
                                {match.notes && (
                                  <p className="text-sm text-gray-500 italic">{match.notes}</p>
                                )}
                              </div>
                              <span
                                className={`px-3 py-1 rounded text-white text-sm font-bold capitalize ${
                                  match.result === 'win'
                                    ? 'bg-green-500'
                                    : match.result === 'loss'
                                    ? 'bg-red-500'
                                    : 'bg-gray-500'
                                }`}
                              >
                                {match.result}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(match.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-500 py-8">No match history yet</p>
                    )}
                  </div>
                )}

                {/* Achievements Tab */}
                {activeTab === 'achievements' && (
                  <div>
                    {profile.achievements && profile.achievements.length > 0 ? (
                      <div className="grid md:grid-cols-2 gap-4">
                        {profile.achievements.map((achievement, idx) => (
                          <div
                            key={idx}
                            className="bg-gradient-to-r from-gold to-yellow-400 rounded-lg p-4 shadow text-navy"
                          >
                            <p className="text-lg font-bold">🏅 {achievement}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-500 py-8">No achievements yet</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {!profile && !error && searchUserId && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-500">Enter a user ID and click search to view a profile</p>
          </div>
        )}
      </div>
    </div>
  );
};
