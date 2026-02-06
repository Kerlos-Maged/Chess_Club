import React, { useState, useEffect } from 'react';
import { eventService } from '../services/api';

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
    <div className="min-h-screen bg-bg">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-navy mb-12">Upcoming Events</h1>
        
        {events.length === 0 ? (
          <p className="text-gray-600 text-lg">No events scheduled yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-navy">{event.title}</h3>
                  <span className="bg-blue text-white px-3 py-1 rounded text-sm">
                    {event.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="text-sm text-gray-700 space-y-1">
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
