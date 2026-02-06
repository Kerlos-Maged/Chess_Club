import React, { useState, useEffect } from 'react';
import { fakeProfiles } from '../data/fakeData';

export const UpcomingMatches = () => {
  const [matches, setMatches] = useState([]);
  const [userRegistered, setUserRegistered] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [filter, setFilter] = useState('all'); // all, upcoming, live, completed

  // Simulate real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize matches
  useEffect(() => {
    const saved = localStorage.getItem('upcomingMatches');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMatches(parsed);
      } catch (error) {
        console.error('Error loading matches:', error);
        initializeDefaultMatches();
      }
    } else {
      initializeDefaultMatches();
    }

    const savedRegistrations = localStorage.getItem('matchRegistrations');
    if (savedRegistrations) {
      try {
        setUserRegistered(JSON.parse(savedRegistrations));
      } catch (error) {
        console.error('Error loading registrations:', error);
      }
    }
  }, []);

  // Save matches to localStorage
  useEffect(() => {
    if (matches.length > 0) {
      localStorage.setItem('upcomingMatches', JSON.stringify(matches));
    }
  }, [matches]);

  // Save registrations to localStorage
  useEffect(() => {
    localStorage.setItem('matchRegistrations', JSON.stringify(userRegistered));
  }, [userRegistered]);

  const initializeDefaultMatches = () => {
    const now = new Date();
    const defaults = [
      {
        _id: '1',
        title: 'Weekly Club Match - Tuesday Night',
        description: 'Regular club match for all members. Friendly games, all skill levels welcome!',
        player1: fakeProfiles[0],
        player2: fakeProfiles[1],
        scheduledTime: new Date(now.getTime() + 2 * 60 * 60 * 1000), // 2 hours from now
        duration: '30 minutes',
        location: 'Club Hall',
        type: 'friendly',
        maxSpectators: 50,
        spectators: [],
        status: 'upcoming',
        format: 'Blitz (5 min)',
        entryFee: 0,
        winner: null,
      },
      {
        _id: '2',
        title: 'Rapid Tournament Qualifier',
        description: 'Qualifier match for upcoming rapid tournament. Win here to advance!',
        player1: fakeProfiles[2],
        player2: fakeProfiles[3],
        scheduledTime: new Date(now.getTime() + 4 * 60 * 60 * 1000), // 4 hours from now
        duration: '45 minutes',
        location: 'Online - Stream Room 1',
        type: 'tournament-qualifier',
        maxSpectators: 100,
        spectators: [],
        status: 'upcoming',
        format: 'Rapid (10 min)',
        entryFee: 0,
        winner: null,
      },
      {
        _id: '3',
        title: 'Beginner Practice Session',
        description: 'Special match for beginners to learn and practice. Coaches available!',
        player1: fakeProfiles[4],
        player2: fakeProfiles[5],
        scheduledTime: new Date(now.getTime() + 6 * 60 * 60 * 1000), // 6 hours from now
        duration: '60 minutes',
        location: 'Online - Learning Room',
        type: 'practice',
        maxSpectators: 30,
        spectators: [],
        status: 'upcoming',
        format: 'Casual (15 min)',
        entryFee: 0,
        winner: null,
      },
      {
        _id: '4',
        title: 'Championship Rematch',
        description: 'Two top players battle it out in rematch! High-level chess!',
        player1: fakeProfiles[6],
        player2: fakeProfiles[7],
        scheduledTime: new Date(now.getTime() - 30 * 60 * 1000), // 30 minutes ago (LIVE)
        duration: '90 minutes',
        location: 'Live Stream - Main Channel',
        type: 'championship',
        maxSpectators: 500,
        spectators: fakeProfiles.slice(0, 15),
        status: 'live',
        format: 'Classical (30 min)',
        entryFee: 0,
        winner: null,
      },
      {
        _id: '5',
        title: 'Sunday Blitz Championship',
        description: 'Fast-paced blitz matches! Multiple games, high energy!',
        player1: null,
        player2: null,
        scheduledTime: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Tomorrow
        duration: '120 minutes',
        location: 'Online Tournament Platform',
        type: 'tournament',
        maxSpectators: 200,
        spectators: [],
        status: 'upcoming',
        format: 'Blitz (3 min)',
        entryFee: 0,
        winner: null,
      },
    ];
    setMatches(defaults);
  };

  const registerAsSpectator = (matchId) => {
    setUserRegistered(prev => ({
      ...prev,
      [matchId]: !prev[matchId]
    }));

    setMatches(matches.map(match => {
      if (match._id === matchId) {
        if (!userRegistered[matchId]) {
          // Add user to spectators (simulated current user)
          return {
            ...match,
            spectators: [...match.spectators, { _id: 'current-user', firstName: 'You', lastName: '(Spectating)', rating: 0 }]
          };
        } else {
          // Remove user from spectators
          return {
            ...match,
            spectators: match.spectators.filter(s => s._id !== 'current-user')
          };
        }
      }
      return match;
    }));
  };

  const formatTimeUntil = (targetTime) => {
    const diff = targetTime - currentTime;
    if (diff < 0) {
      const pastDiff = Math.abs(diff);
      const minutes = Math.floor(pastDiff / 60000);
      const hours = Math.floor(minutes / 60);
      if (hours > 0) {
        return `${hours}h ${minutes % 60}m ago`;
      }
      return `${minutes}m ago`;
    }

    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m left`;
    }
    if (minutes > 0) {
      return `${minutes}m ${seconds}s left`;
    }
    return `${seconds}s left`;
  };

  const getMatchStatus = (match) => {
    const diff = match.scheduledTime - currentTime;
    if (diff < 0 && Math.abs(diff) < 90 * 60 * 1000) {
      return 'live';
    }
    if (diff < 0) {
      return 'completed';
    }
    return 'upcoming';
  };

  const filteredMatches = matches.filter(match => {
    const status = getMatchStatus(match);
    if (filter === 'all') return true;
    return status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'live':
        return 'bg-red-500 animate-pulse';
      case 'upcoming':
        return 'bg-blue';
      case 'completed':
        return 'bg-gray-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'live':
        return 'LIVE NOW';
      case 'upcoming':
        return 'UPCOMING';
      case 'completed':
        return 'COMPLETED';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-navy mb-4">Live Matches</h1>
          <p className="text-xl text-gray-600">
            Watch live matches, join as spectator, and stay connected with the chess community! All matches are <span className="font-bold text-gold">FREE</span> to watch.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-4 mb-8 flex-wrap">
          {['all', 'live', 'upcoming', 'completed'].map(filterType => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-6 py-2 rounded font-bold transition ${
                filter === filterType
                  ? 'bg-gold text-navy'
                  : 'bg-white text-navy border-2 border-navy hover:bg-gray-100'
              }`}
            >
              {filterType === 'all' && 'All Matches'}
              {filterType === 'live' && 'Live Now'}
              {filterType === 'upcoming' && 'Upcoming'}
              {filterType === 'completed' && 'Completed'}
            </button>
          ))}
        </div>

        {/* Live Indicator */}
        {filteredMatches.some(m => getMatchStatus(m) === 'live') && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700 font-bold">
              {filteredMatches.filter(m => getMatchStatus(m) === 'live').length} Match(es) Live Now!
            </p>
          </div>
        )}

        {/* Matches Grid */}
        <div className="grid gap-6">
          {filteredMatches.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <p className="text-gray-600 text-lg">No matches in this category at the moment.</p>
              <p className="text-gray-500 mt-2">Check back soon for more upcoming matches!</p>
            </div>
          ) : (
            filteredMatches.map(match => {
              const status = getMatchStatus(match);
              const timeFormat = formatTimeUntil(match.scheduledTime);

              return (
                <div
                  key={match._id}
                  className={`bg-white rounded-lg shadow-lg overflow-hidden border-l-4 transition transform hover:shadow-xl ${
                    status === 'live'
                      ? 'border-l-red-500 animate-pulse'
                      : status === 'upcoming'
                      ? 'border-l-blue'
                      : 'border-l-gray-400'
                  }`}
                >
                  {/* Match Header */}
                  <div
                    className={`${getStatusColor(status)} text-white p-4 flex justify-between items-center`}
                  >
                    <div>
                      <h3 className="text-2xl font-bold">{match.title}</h3>
                      <p className="text-sm opacity-90">{match.description}</p>
                    </div>
                    <span className="text-sm font-bold px-4 py-2 bg-white rounded text-navy">
                      {getStatusLabel(status)}
                    </span>
                  </div>

                  {/* Match Content */}
                  <div className="p-6">
                    {/* Time Countdown */}
                    <div className="mb-6 text-center">
                      <div
                        className={`text-3xl font-bold mb-2 ${
                          status === 'live' ? 'text-red-600 animate-pulse' : 'text-navy'
                        }`}
                      >
                        {timeFormat}
                      </div>
                      <p className="text-gray-600">
                        {match.scheduledTime.toLocaleString([], {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      {/* Players */}
                      <div className="md:col-span-2">
                        <h4 className="font-bold text-navy mb-4">Players</h4>
                        <div className="space-y-3">
                          {match.player1 ? (
                            <div className="flex items-center justify-between p-3 bg-blue/10 rounded border-l-4 border-blue">
                              <div>
                                <p className="font-bold text-lg">
                                  {match.player1.firstName} {match.player1.lastName}
                                </p>
                                <p className="text-sm text-gray-600">Rating: {match.player1.rating}</p>
                              </div>
                              <span className="text-2xl">♔</span>
                            </div>
                          ) : (
                            <div className="p-3 bg-gray-100 rounded text-gray-500 italic">
                              Waiting for player assignment...
                            </div>
                          )}

                          <div className="text-center font-bold text-gray-600">VS</div>

                          {match.player2 ? (
                            <div className="flex items-center justify-between p-3 bg-gold/10 rounded border-l-4 border-gold">
                              <div>
                                <p className="font-bold text-lg">
                                  {match.player2.firstName} {match.player2.lastName}
                                </p>
                                <p className="text-sm text-gray-600">Rating: {match.player2.rating}</p>
                              </div>
                              <span className="text-2xl">♚</span>
                            </div>
                          ) : (
                            <div className="p-3 bg-gray-100 rounded text-gray-500 italic">
                              Waiting for player assignment...
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Match Info */}
                      <div>
                        <h4 className="font-bold text-navy mb-4">Match Info</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <p className="text-gray-600">Format</p>
                            <p className="font-bold text-navy">{match.format}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Duration</p>
                            <p className="font-bold text-navy">{match.duration}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Location</p>
                            <p className="font-bold text-navy">{match.location}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Entry Fee</p>
                            <p className="font-bold text-gold">FREE</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Spectators */}
                    <div className="mb-6 bg-gray-50 p-4 rounded">
                      <h4 className="font-bold text-navy mb-3">
                        Watching ({match.spectators.length} / {match.maxSpectators})
                      </h4>
                      {match.spectators.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {match.spectators.slice(0, 10).map(spectator => (
                            <span
                              key={spectator._id}
                              className="px-3 py-1 bg-blue/20 text-navy rounded-full text-sm font-semibold"
                            >
                              {spectator.firstName} {spectator.lastName}
                            </span>
                          ))}
                          {match.spectators.length > 10 && (
                            <span className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full text-sm font-semibold">
                              +{match.spectators.length - 10} more
                            </span>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-600 italic">No one watching yet. Be the first!</p>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="flex gap-4">
                      <button
                        onClick={() => registerAsSpectator(match._id)}
                        className={`flex-1 font-bold py-3 rounded transition ${
                          userRegistered[match._id]
                            ? 'bg-navy text-white hover:bg-blue'
                            : 'bg-gold text-navy hover:bg-yellow-400'
                        }`}
                      >
                        {userRegistered[match._id]
                          ? 'Watching - Click to Unwatch'
                          : 'Watch Match (Free)'}
                      </button>
                      {status === 'live' && (
                        <button className="flex-1 bg-red-500 text-white font-bold py-3 rounded hover:bg-red-600 transition">
                          Join Live Stream
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Stats Footer */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-blue/10 p-6 rounded-lg text-center border-2 border-blue">
            <p className="text-4xl font-bold text-blue">
              {filteredMatches.filter(m => getMatchStatus(m) === 'live').length}
            </p>
            <p className="text-gray-600 font-semibold">Matches Live Now</p>
          </div>
          <div className="bg-gold/10 p-6 rounded-lg text-center border-2 border-gold">
            <p className="text-4xl font-bold text-gold">
              {filteredMatches.filter(m => getMatchStatus(m) === 'upcoming').length}
            </p>
            <p className="text-gray-600 font-semibold">Upcoming Matches</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg text-center border-2 border-green-500">
            <p className="text-4xl font-bold text-green-600">Free</p>
            <p className="text-gray-600 font-semibold">To Watch</p>
          </div>
        </div>
      </div>
    </div>
  );
};
