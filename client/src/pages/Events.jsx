import React, { useState, useEffect } from 'react';

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventService.getAll();
        setEvents(response.data);
      } catch (err) {
        setError('Failed to load events');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <div className="text-center py-20">Loading events...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white pt-28">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-12">Upcoming Events</h1>
        
        {events.length === 0 ? (
          <p className="text-gray-600 text-lg font-medium text-center py-12">No events scheduled yet. Check back soon!</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition border-l-4 border-amber-500"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-amber-700">{event.title}</h3>
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    {event.category}
                  </span>
                </div>
                <p className="text-gray-700 mb-4 font-medium">{event.description}</p>
                <div className="text-sm text-gray-600 space-y-2 font-medium">
                  <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                  <p>🕐 {event.time}</p>
                  <p>📍 {event.location}</p>
                  {event.capacity && <p>👥 Capacity: {event.capacity}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
