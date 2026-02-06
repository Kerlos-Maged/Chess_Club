import React from 'react';

const teamMembers = [
  {
    id: 1,
    name: 'Khalid Ahmed',
    role: 'Club President',
    image: '👑',
    bio: 'Passionate chess enthusiast with a rating of 1850. Leading the club to new heights.',
  },
  {
    id: 2,
    name: 'Fatima Hassan',
    role: 'Vice President',
    image: '♕',
    bio: 'Strategic thinker and puzzle master. Specializes in tournament organization.',
  },
  {
    id: 3,
    name: 'Omar Ibrahim',
    role: 'Treasurer & Events Coordinator',
    image: '♖',
    bio: 'Manages resources and organizes exciting chess events and competitions.',
  },
  {
    id: 4,
    name: 'Sara Wilson',
    role: 'Training Director',
    image: '🎓',
    bio: 'Coaches beginner and intermediate players. Passionate about player development.',
  },
  {
    id: 5,
    name: 'Ahmed Mohamed',
    role: 'Technical Lead',
    image: '💻',
    bio: 'Developed our online platform. Ensures smooth tech operations.',
  },
  {
    id: 6,
    name: 'Zainab Khan',
    role: 'Community Manager',
    image: '🤝',
    bio: 'Builds connections within the chess community. Welcomes all new members.',
  },
];

export const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-cyan-50 to-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3 md:mb-4">
            About Chess Club
          </h1>
          <p className="text-sm md:text-base lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Building a vibrant chess community where players of all levels can learn, compete, and grow together.
          </p>
        </div>

        {/* Founded Section */}
        <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg shadow-lg p-8 mb-8 border-l-4 border-blue-600">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">🎉 Newly Founded in 2025</h2>
          <p className="text-gray-700 leading-relaxed">
            The Chess Club is a brand new initiative launched in 2025 to bring the intellectual game of chess to our school community. 
            We're starting from the ground up and building a vibrant, welcoming community for all players!
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg shadow-lg p-8 mb-8 border-l-4 border-amber-600">
          <h2 className="text-2xl font-bold text-amber-700 mb-4">🎯 Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            We aim to foster a love for chess among our school community by providing a supportive environment where players 
            of all skill levels can learn, grow, and compete together. We're committed to helping every member discover their 
            potential and become part of a thriving chess community.
          </p>
        </div>

        {/* What We're Building Section */}
        <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg shadow-lg p-8 mb-8 border-l-4 border-green-600">
          <h2 className="text-2xl font-bold text-green-700 mb-4">🚀 What We're Building</h2>
          <ul className="text-gray-700 space-y-2">
            <li>✓ Weekly practice sessions for all levels</li>
            <li>✓ Regular tournaments (starting with monthly events)</li>
            <li>✓ Beginner coaching and training</li>
            <li>✓ Development programs for advanced players</li>
            <li>✓ Community events and team competitions</li>
            <li>✓ Online chess platform for members</li>
          </ul>
        </div>

        {/* Our Values Section */}
        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg shadow-lg p-8 mb-8 border-l-4 border-indigo-600">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6">💎 Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="text-lg font-bold text-indigo-600 mb-2">🎓 Excellence</h3>
              <p className="text-sm text-gray-600">We strive for continuous improvement and help our members reach their highest potential.</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="text-lg font-bold text-indigo-600 mb-2">🤝 Inclusivity</h3>
              <p className="text-sm text-gray-600">Everyone is welcome, regardless of skill level or background. We celebrate diversity.</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="text-lg font-bold text-indigo-600 mb-2">🏆 Sportsmanship</h3>
              <p className="text-sm text-gray-600">We respect our opponents, learn from losses, and celebrate achievements together.</p>
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8 text-center">👥 Meet Our Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-lg p-4 md:p-6 border-t-4 border-blue-500 hover:shadow-xl transition transform hover:scale-105">
                <div className="text-4xl md:text-5xl text-center mb-3 md:mb-4">{member.image}</div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 text-center mb-1">{member.name}</h3>
                <p className="text-xs md:text-sm text-blue-600 font-semibold text-center mb-2 md:mb-3">{member.role}</p>
                <p className="text-xs md:text-sm text-gray-600 text-center">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join Us Section */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg shadow-lg p-4 md:p-8 mb-4 md:mb-8 border-l-4 border-purple-600">
          <h2 className="text-xl md:text-2xl font-bold text-purple-700 mb-2 md:mb-4">💪 Join Us On This Journey!</h2>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-2 md:mb-4">
            We're looking for members of all skill levels—from complete beginners to experienced players. 
            This is an opportunity to be part of building something new and special at our school. 
            Help us establish a strong chess tradition!
          </p>
          <p className="text-sm md:text-base text-gray-700 font-semibold">
            👉 Ready to join? Visit our Join page or contact any leadership team member directly!
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-lg shadow-lg p-4 md:p-8 mb-4 md:mb-8 border-l-4 border-red-600">
          <h2 className="text-xl md:text-2xl font-bold text-red-700 mb-3 md:mb-4">📞 Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 text-gray-700">
            <div>
              <p className="font-semibold mb-1 md:mb-2 text-sm md:text-base">📧 Email</p>
              <p className="text-xs md:text-sm">chesclub@school.edu</p>
            </div>
            <div>
              <p className="font-semibold mb-1 md:mb-2 text-sm md:text-base">📍 Meeting Location</p>
              <p className="text-xs md:text-sm">Room 205, Every Monday & Thursday 3:30 PM</p>
            </div>
          </div>
          <p className="text-gray-600 text-xs md:text-sm font-medium mt-3 md:mt-4 pt-3 md:pt-4 border-t border-red-300">
            Have questions or suggestions? Reach out to any of our leadership team members or join us at our next meeting!
          </p>
        </div>

        {/* Quick Stats Section */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg shadow-lg p-4 md:p-8 mb-4 md:mb-8 text-white">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">📊 By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-center">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-blue-400">50+</p>
              <p className="text-xs md:text-sm text-gray-300">Active Members</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-cyan-400">12</p>
              <p className="text-xs md:text-sm text-gray-300">Events Per Year</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-green-400">4</p>
              <p className="text-xs md:text-sm text-gray-300">Skill Levels</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-amber-400">100%</p>
              <p className="text-xs md:text-sm text-gray-300">Fun & Learning</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
