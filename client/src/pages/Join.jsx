import React, { useState } from 'react';
import { memberService } from '../services/api';

export const Join = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    grade: '',
    experience: 'beginner',
    reason: '',
  });
  const [submitted, setSubmitted] = useState(false);
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
      await memberService.submitApplication(formData);
      setSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        grade: '',
        experience: 'beginner',
        reason: '',
      });
    } catch (err) {
      setError('Failed to submit application. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <h2 className="text-3xl font-bold text-gold mb-4">✓ Success!</h2>
          <p className="text-gray-700 mb-6">
            Your application has been submitted successfully. We'll review it and get back to you soon!
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-blue text-white px-6 py-2 rounded hover:bg-navy transition"
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-2xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-navy mb-8 text-center">Join Chess Club</h1>
        
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8 space-y-6"
        >
          {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="border-2 border-gray-300 rounded px-4 py-2 focus:border-blue outline-none"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="border-2 border-gray-300 rounded px-4 py-2 focus:border-blue outline-none"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border-2 border-gray-300 rounded px-4 py-2 focus:border-blue outline-none"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone (Optional)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded px-4 py-2 focus:border-blue outline-none"
          />

          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            required
            className="w-full border-2 border-gray-300 rounded px-4 py-2 focus:border-blue outline-none"
          >
            <option value="">Select Grade</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>

          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded px-4 py-2 focus:border-blue outline-none"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <textarea
            name="reason"
            placeholder="Why do you want to join? (Optional)"
            value={formData.reason}
            onChange={handleChange}
            rows="4"
            className="w-full border-2 border-gray-300 rounded px-4 py-2 focus:border-blue outline-none resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-navy font-bold py-3 rounded hover:bg-yellow-500 transition disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};
