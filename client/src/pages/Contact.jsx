import React, { useState } from 'react';
import { contactService } from '../services/api';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await contactService.send(formData);
      setSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-2xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-navy mb-4 text-center">Contact Us</h1>
        <p className="text-gray-600 text-center mb-12">
          Have questions? Send us a message and we'll get back to you soon!
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8 space-y-6"
        >
          {sent && (
            <div className="bg-green-100 text-green-700 p-3 rounded">
              Message sent successfully!
            </div>
          )}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
          )}

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border-2 border-gray-300 rounded px-4 py-2 focus:border-blue outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border-2 border-gray-300 rounded px-4 py-2 focus:border-blue outline-none"
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full border-2 border-gray-300 rounded px-4 py-2 focus:border-blue outline-none"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="6"
            className="w-full border-2 border-gray-300 rounded px-4 py-2 focus:border-blue outline-none resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue text-white font-bold py-3 rounded hover:bg-navy transition disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};
