// Removed search bar, updated layout, added user image, and adjusted rating display
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export const Profile = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState('statistics');

  // Add fake data for Alex and Aom
  const fakeProfiles = [
    { _id: 'alex123', userId: 'alex123', firstName: 'Alex', lastName: 'Johnson', rating: 2100, totalGames: 75, draws: 10, wins: 60, losses: 5, matchHistory: [
      { opponentName: 'John Doe', opponentClub: 'Chess Club A', result: 'Win', date: '2026-01-15', playerColor: 'white' },
      { opponentName: 'Sarah Williams', opponentClub: 'Elite Chess', result: 'Win', date: '2026-01-14', playerColor: 'black' },
      { opponentName: 'Mike Chen', opponentClub: 'Chess Club C', result: 'Loss', date: '2026-01-12', playerColor: 'white' },
      { opponentName: 'Emma Brown', opponentClub: 'Chess Masters', result: 'Win', date: '2026-01-10', playerColor: 'black' },
      { opponentName: 'David Lee', opponentClub: 'Grandmaster Academy', result: 'Win', date: '2026-01-08', playerColor: 'white' }
    ], achievements: ['Won 2025 Championship', 'Top 10 Player 2024'] },
    { _id: 'aom456', userId: 'aom456', firstName: 'Aom', lastName: 'Tanaka', rating: 2050, totalGames: 70, draws: 8, wins: 55, losses: 7, matchHistory: [
      { opponentName: 'Jane Smith', opponentClub: 'Chess Club B', result: 'Loss', date: '2026-01-10', playerColor: 'black' },
      { opponentName: 'Robert King', opponentClub: 'Knight Academy', result: 'Win', date: '2026-01-09', playerColor: 'white' },
      { opponentName: 'Lisa Park', opponentClub: 'Chess Club D', result: 'Win', date: '2026-01-07', playerColor: 'black' },
      { opponentName: 'James Miller', opponentClub: 'Elite Chess', result: 'Loss', date: '2026-01-05', playerColor: 'white' },
      { opponentName: 'Sophie Martin', opponentClub: 'Royal Chess Club', result: 'Win', date: '2026-01-03', playerColor: 'black' }
    ], achievements: ['Runner-up 2025 Championship'] },
  ];

  // Default to Alex if no userId provided or if userId doesn't match
  const user = fakeProfiles.find(profile => profile.userId === userId) || fakeProfiles[0];

  const isOwnProfile = user && user._id === userId;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-16 md:pt-32 pb-8 md:pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-slate-800 text-amber-100 rounded-lg p-4 md:p-6 shadow-lg flex flex-col md:flex-row md:items-center gap-4 md:gap-0">
          <div className="flex-1 text-center md:text-left">
            <img
              src={user?.profileImage || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-24 md:w-32 h-24 md:h-32 rounded-full border-4 border-amber-400 shadow-md mb-3 md:mb-4 mx-auto md:mx-0"
            />
            <h1 className="text-2xl md:text-4xl font-bold text-amber-400">{user?.firstName} {user?.lastName}</h1>
            <p className="text-xs md:text-sm mt-1 md:mt-2">ID: {user?.userId}</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-4xl md:text-6xl font-bold text-amber-400">{user?.rating}</p>
            <p className="text-base md:text-lg text-amber-200">Rating</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 md:mt-6">
          <div className="flex border-b border-slate-700 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('statistics')}
              className={`flex-1 py-2 md:py-3 px-2 md:px-0 text-center font-bold transition text-xs md:text-base whitespace-nowrap ${activeTab === 'statistics' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-amber-200 hover:text-amber-400'}`}>
              Statistics
            </button>
            <button 
              onClick={() => setActiveTab('matches')}
              className={`flex-1 py-2 md:py-3 px-2 md:px-0 text-center font-bold transition text-xs md:text-base whitespace-nowrap ${activeTab === 'matches' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-amber-200 hover:text-amber-400'}`}>
              Matches
            </button>
            <button 
              onClick={() => setActiveTab('achievements')}
              className={`flex-1 py-2 md:py-3 px-2 md:px-0 text-center font-bold transition text-xs md:text-base whitespace-nowrap ${activeTab === 'achievements' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-amber-200 hover:text-amber-400'}`}>
              Achievements
            </button>
          </div>

          {/* Statistics Section */}
          {activeTab === 'statistics' && (
            <div className="p-4 md:p-6 bg-slate-800 rounded-lg shadow-md mt-4 text-amber-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-4 md:mt-6">
              <div className="bg-slate-700 p-3 md:p-4 rounded-lg text-center">
                <p className="text-lg md:text-2xl font-bold text-amber-300">{user?.totalGames}</p>
                <p className="text-xs md:text-sm text-amber-200">Total Games</p>
              </div>
              <div className="bg-slate-700 p-3 md:p-4 rounded-lg text-center">
                <p className="text-lg md:text-2xl font-bold text-green-400">{user?.wins}</p>
                <p className="text-xs md:text-sm text-amber-200">Wins</p>
              </div>
              <div className="bg-slate-700 p-3 md:p-4 rounded-lg text-center">
                <p className="text-lg md:text-2xl font-bold text-red-400">{user?.losses}</p>
                <p className="text-xs md:text-sm text-amber-200">Losses</p>
              </div>
              <div className="bg-slate-700 p-3 md:p-4 rounded-lg text-center">
                <p className="text-lg md:text-2xl font-bold text-amber-300">{user?.draws}</p>
                <p className="text-xs md:text-sm text-amber-200">Draws</p>
              </div>
              <div className="bg-slate-700 p-3 md:p-4 rounded-lg text-center col-span-2">
                <p className="text-lg md:text-2xl font-bold text-amber-300">{user?.rating}</p>
                <p className="text-xs md:text-sm text-amber-200">Current Rating</p>
              </div>
            </div>
          </div>
          )}

          {/* Match History Section */}
          {activeTab === 'matches' && (
          <div className="p-4 md:p-6 bg-slate-800 rounded-lg shadow-md mt-4 text-amber-100">
            <h2 className="text-xl md:text-2xl font-bold text-amber-400 mb-3 md:mb-4">Match History</h2>
            <div className="space-y-2 md:space-y-4">
              {user?.matchHistory?.length > 0 ? (
                user.matchHistory.map((match, index) => (
                  <div key={index} className="flex flex-col sm:flex-row rounded-lg overflow-hidden shadow-lg border-2 border-amber-500/30">
                    {/* Show player on white side if they played white, otherwise on black side */}
                    {match.playerColor === 'white' ? (
                      <>
                        {/* Player as White - Left */}
                        <div className="flex-1 bg-gradient-to-r from-gray-100 to-gray-50 p-3 md:p-6 text-gray-900 border-b-2 sm:border-b-0 sm:border-r-4 border-amber-400/50">
                          <p className="font-bold text-base md:text-lg mb-1 md:mb-2">{user?.firstName} {user?.lastName}</p>
                          <p className="text-xs md:text-sm opacity-75">{user?.userId}</p>
                          {match.result === 'Win' && <p className="text-green-600 font-bold mt-1 md:mt-2 text-sm">✓ Winner</p>}
                          {match.result === 'Loss' && <p className="text-red-600 font-bold mt-1 md:mt-2 text-sm">✗ Loss</p>}
                        </div>

                        {/* Opponent as Black - Right */}
                        <div className="flex-1 bg-gradient-to-l from-gray-900 to-gray-800 p-3 md:p-6 text-gray-100 border-t-2 sm:border-t-0 sm:border-l-4 border-amber-400/50">
                          <p className="font-bold text-base md:text-lg mb-1 md:mb-2 text-right">{match.opponentName}</p>
                          <p className="text-xs md:text-sm opacity-75 text-right">{match.opponentClub}</p>
                          {match.result === 'Win' && <p className="text-red-400 font-bold mt-1 md:mt-2 text-sm text-right">✗ Loss</p>}
                          {match.result === 'Loss' && <p className="text-green-400 font-bold mt-1 md:mt-2 text-sm text-right">✓ Winner</p>}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Opponent as White - Left */}
                        <div className="flex-1 bg-gradient-to-r from-gray-100 to-gray-50 p-3 md:p-6 text-gray-900 border-b-2 sm:border-b-0 sm:border-r-4 border-amber-400/50">
                          <p className="font-bold text-base md:text-lg mb-1 md:mb-2">{match.opponentName}</p>
                          <p className="text-xs md:text-sm opacity-75">{match.opponentClub}</p>
                          {match.result === 'Win' && <p className="text-red-600 font-bold mt-1 md:mt-2 text-sm">✗ Loss</p>}
                          {match.result === 'Loss' && <p className="text-green-600 font-bold mt-1 md:mt-2 text-sm">✓ Winner</p>}
                        </div>

                        {/* Player as Black - Right */}
                        <div className="flex-1 bg-gradient-to-l from-gray-900 to-gray-800 p-3 md:p-6 text-gray-100 border-t-2 sm:border-t-0 sm:border-l-4 border-amber-400/50">
                          <p className="font-bold text-base md:text-lg mb-1 md:mb-2 text-right">{user?.firstName} {user?.lastName}</p>
                          <p className="text-xs md:text-sm opacity-75 text-right">{user?.userId}</p>
                          {match.result === 'Win' && <p className="text-green-400 font-bold mt-1 md:mt-2 text-sm text-right">✓ Winner</p>}
                          {match.result === 'Loss' && <p className="text-red-400 font-bold mt-1 md:mt-2 text-sm text-right">✗ Loss</p>}
                        </div>
                      </>
                    )}

                    {/* Date */}
                    <div className="bg-slate-700 px-3 md:px-4 py-4 md:py-6 flex items-center justify-center text-amber-200 font-semibold text-sm md:text-base whitespace-nowrap">
                      <p>{new Date(match.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No match history available.</p>
              )}
            </div>
          </div>
          )}

          {/* Achievements Section */}
          {activeTab === 'achievements' && (
          <div className="p-4 md:p-6 bg-slate-800 rounded-lg shadow-md mt-4 text-amber-100\">
            <h2 className="text-xl md:text-2xl font-bold text-amber-400 mb-3 md:mb-4\">Achievements</h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base\">
              {user?.achievements?.length > 0 ? (
                user.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))
              ) : (
                <p>No achievements yet.</p>
              )}
            </ul>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};