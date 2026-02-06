import React, { useState } from 'react';

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
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
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
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center pt-16 md:pt-20 px-4 md:px-6">
        <div className="bg-slate-800 rounded-xl shadow-2xl p-8 max-w-md text-center border-2 border-green-500/50">
          <div className="text-5xl mb-4">✓</div>
          <h2 className="text-3xl font-bold text-green-400 mb-4">Success!</h2>
          <p className="text-amber-100 mb-6">
            Your application has been submitted successfully. We'll review it and get back to you soon!
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-green-600/50 transition font-bold"
          >
            Submit Another Application
          </button>
          <a
            href="/"
            className="block mt-4 text-green-400 hover:underline"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-16 md:pt-20 px-4 md:px-6">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-green-900/40 via-slate-900 to-emerald-900/40 overflow-hidden py-20 mb-12 border-b-2 border-green-500/30">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-20">
          <div className="text-center">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-green-300 via-amber-100 to-emerald-300 bg-clip-text text-transparent mb-4 drop-shadow-lg">
              Join Chess Club
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-6">
              Be part of our growing chess community. Fill out your information and we'll welcome you with open arms!
            </p>
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-green-600/50 transition font-bold">
              Learn More
            </button>
          </div>
          <div className="mt-8 flex justify-center">
            <img src="/public/chess-illustration.png" alt="Chess Illustration" className="w-1/2 rounded-lg shadow-lg" />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-16">
        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <div className="bg-slate-800/50 border border-green-500/30 rounded-lg p-4 text-center hover:shadow-lg hover:shadow-green-500/50 transition">
            <p className="text-3xl mb-2">🎓</p>
            <p className="text-green-300 font-semibold text-sm">All Skill Levels Welcome</p>
            <p className="text-yellow-200/60 text-xs mt-1">From beginners to advanced</p>
          </div>
          <div className="bg-slate-800/50 border border-green-500/30 rounded-lg p-4 text-center hover:shadow-lg hover:shadow-green-500/50 transition">
            <p className="text-3xl mb-2">👥</p>
            <p className="text-green-300 font-semibold text-sm">Supportive Community</p>
            <p className="text-yellow-200/60 text-xs mt-1">Grow with fellow players</p>
          </div>
          <div className="bg-slate-800/50 border border-green-500/30 rounded-lg p-4 text-center hover:shadow-lg hover:shadow-green-500/50 transition">
            <p className="text-3xl mb-2">🏆</p>
            <p className="text-green-300 font-semibold text-sm">Regular Events</p>
            <p className="text-yellow-200/60 text-xs mt-1">Tournaments & competitions</p>
          </div>
        </div>

        {/* Application Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800/50 rounded-xl shadow-2xl p-8 space-y-6 border border-green-500/30"
        >
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-green-300 font-semibold mb-2">Full Name</label>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="bg-slate-700 border border-slate-600 text-amber-100 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none transition placeholder-slate-400"
                title="Enter your first name"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="bg-slate-700 border border-slate-600 text-amber-100 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none transition placeholder-slate-400"
                title="Enter your last name"
              />
            </div>
          </div>

          <div>
            <label className="block text-green-300 font-semibold mb-2">📧 Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="your.email@school.edu"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-slate-700 border border-slate-600 text-amber-100 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none transition placeholder-slate-400"
            />
          </div>

          <div>
            <label className="block text-green-300 font-semibold mb-2">📞 Phone (Optional)</label>
            <input
              type="tel"
              name="phone"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-slate-700 border border-slate-600 text-amber-100 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none transition placeholder-slate-400"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-green-300 font-semibold mb-2">🎓 Grade Level</label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
                className="w-full bg-slate-700 border border-slate-600 text-amber-100 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none transition"
              >
                <option value="">Select Your Grade</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>

            <div>
              <label className="block text-green-300 font-semibold mb-2">♚ Chess Experience</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full bg-slate-700 border border-slate-600 text-amber-100 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none transition"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-green-300 font-semibold mb-2">💭 Why Join Chess Club?</label>
            <textarea
              name="reason"
              placeholder="Tell us what excites you about joining our chess community... (Optional)"
              value={formData.reason}
              onChange={handleChange}
              rows="4"
              className="w-full bg-slate-700 border border-slate-600 text-amber-100 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none transition resize-none placeholder-slate-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-green-600/50 transition disabled:opacity-50 transform hover:scale-105"
          >
            {loading ? '⏳ Submitting...' : '🎯 Submit Application'}
          </button>

          <p className="text-center text-yellow-200/60 text-sm">
            We'll review your application and get back to you within 24 hours!
          </p>
        </form>
      </div>
    </div>
  );
};
