import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const CompetitionsChessboardCalendar = () => {
  const navigate = useNavigate();
  const { user, userType } = useContext(AuthContext);
  const [tournaments, setTournaments] = useState([]);
  const [registeredTournaments, setRegisteredTournaments] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

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

  const getTournamentsByMonth = () => {
    return tournaments.filter(t => {
      const date = new Date(t.startDate);
      return date.getMonth() === selectedMonth && date.getFullYear() === selectedYear;
    });
  };

  const isRegistered = (id) => registeredTournaments.includes(id);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const getTournamentsForDay = (day) => {
    return tournaments.filter(t => {
      const date = new Date(t.startDate);
      return (
        date.getDate() === day &&
        date.getMonth() === selectedMonth &&
        date.getFullYear() === selectedYear
      );
    });
  };

  const renderCalendar = () => {
    const days = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const daysArray = [];

    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null);
    }

    for (let i = 1; i <= days; i++) {
      daysArray.push(i);
    }

    const weeks = [];
    for (let i = 0; i < daysArray.length; i += 7) {
      weeks.push(daysArray.slice(i, i + 7));
    }

    return weeks.map((week, weekIdx) => (
      <div key={weekIdx} className="grid grid-cols-7 gap-2">
        {week.map((day, dayIdx) => {
          if (!day) {
            return <div key={`empty-${dayIdx}`} className="bg-slate-50"></div>;
          }

          const dayTournaments = getTournamentsForDay(day);
          const hasEvent = dayTournaments.length > 0;

          return (
            <div
              key={day}
              className={`p-2 rounded border-2 min-h-20 flex flex-col gap-1 ${
                hasEvent
                  ? 'bg-blue-50 border-blue-400 cursor-pointer hover:bg-blue-100'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <p className="font-bold text-sm">{day}</p>
              {dayTournaments.map(t => (
                <div key={t._id} className="bg-blue-500 text-white text-xs px-2 py-1 rounded truncate">
                  {t.name.substring(0, 8)}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    ));
  };

  const monthTournaments = getTournamentsByMonth();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-black mb-2">📅 TOURNAMENT CALENDAR</h1>
          <p className="text-blue-100">Plan your chess journey with our complete event schedule</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar Filters */}
          <div className="space-y-8">
            {/* Month/Year Selector */}
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <h3 className="font-black text-lg mb-4">SELECT MONTH</h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedMonth(selectedMonth === 0 ? 11 : selectedMonth - 1);
                      if (selectedMonth === 0) setSelectedYear(selectedYear - 1);
                    }}
                    className="px-3 py-2 bg-slate-200 rounded hover:bg-slate-300 transition text-sm font-bold"
                  >
                    ← Prev
                  </button>
                  <div className="flex-1 text-center">
                    <p className="font-bold text-slate-700">
                      {new Date(selectedYear, selectedMonth).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedMonth(selectedMonth === 11 ? 0 : selectedMonth + 1);
                      if (selectedMonth === 11) setSelectedYear(selectedYear + 1);
                    }}
                    className="px-3 py-2 bg-slate-200 rounded hover:bg-slate-300 transition text-sm font-bold"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>

            {/* Event Type Filter */}
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <h3 className="font-black text-lg mb-4">FILTER BY TYPE</h3>
              <div className="space-y-2">
                {['All', 'Tournament', 'Training', 'Social'].map(type => (
                  <button
                    key={type}
                    className="w-full text-left px-4 py-2 rounded bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition font-medium"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Skill Level Filter */}
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <h3 className="font-black text-lg mb-4">SKILL LEVEL</h3>
              <div className="space-y-2">
                {['All Levels', 'Beginner', 'Intermediate', 'Advanced'].map(level => (
                  <label key={level} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded" defaultChecked={level === 'All Levels'} />
                    <span className="text-sm font-medium text-slate-700">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <p className="text-sm text-slate-600 mb-2">THIS MONTH</p>
              <p className="text-4xl font-black text-blue-600 mb-1">{monthTournaments.length}</p>
              <p className="text-sm text-slate-600">events scheduled</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Calendar Grid */}
            <div className="bg-white border border-slate-200 rounded-lg p-8 mb-8">
              <div className="mb-6">
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-bold text-slate-600 text-sm py-2">
                      {day}
                    </div>
                  ))}
                </div>
                {renderCalendar()}
              </div>
            </div>

            {/* Events List */}
            {monthTournaments.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-900 mb-4">
                  EVENTS IN {new Date(selectedYear, selectedMonth).toLocaleDateString('en-US', {
                    month: 'long',
                  }).toUpperCase()}
                </h3>
                {monthTournaments.map(tournament => {
                  const participantCount = (tournament.participants || []).length;
                  const isFull = participantCount >= tournament.maxParticipants;
                  const isUserReg = isRegistered(tournament._id);

                  return (
                    <div
                      key={tournament._id}
                      className="bg-white border-2 border-slate-200 rounded-lg p-6 hover:border-blue-400 transition"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-xl font-black text-slate-900 mb-1">{tournament.name}</h4>
                          <p className="text-slate-600">{tournament.description}</p>
                        </div>
                        <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                          {tournament.format}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t border-slate-200">
                        <div>
                          <p className="text-xs text-slate-500 font-semibold">DATE</p>
                          <p className="font-bold text-slate-900">
                            {new Date(tournament.startDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-semibold">PARTICIPANTS</p>
                          <p className="font-bold text-slate-900">
                            {participantCount}/{tournament.maxParticipants}
                          </p>
                        </div>
                        <div className="text-right">
                          {isFull ? (
                            <button disabled className="px-4 py-2 bg-slate-300 text-slate-600 rounded font-bold cursor-not-allowed">
                              FULL
                            </button>
                          ) : isUserReg ? (
                            <button disabled className="px-4 py-2 bg-emerald-500 text-white rounded font-bold">
                              ✓ REGISTERED
                            </button>
                          ) : (
                            <button
                              onClick={() => handleRegister(tournament._id)}
                              className="px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition"
                            >
                              REGISTER
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {monthTournaments.length === 0 && (
              <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-slate-600 mb-2">No events this month</p>
                <p className="text-sm text-slate-500">Select another month to see available tournaments</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
