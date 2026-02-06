import React from 'react';

export const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-cyan-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-8">About Chess Club</h1>
        
        <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg shadow-lg p-8 mb-8 border-l-4 border-blue-600">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">🎉 Newly Founded in 2025</h2>
          <p className="text-gray-700 leading-relaxed">
            The Chess Club is a brand new initiative launched in 2025 to bring the intellectual game of chess to our school community. 
            We're starting from the ground up and building a vibrant, welcoming community for all players!
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg shadow-lg p-8 mb-8 border-l-4 border-amber-600">
          <h2 className="text-2xl font-bold text-amber-700 mb-4">🎯 Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            We aim to foster a love for chess among our school community by providing a supportive environment where players 
            of all skill levels can learn, grow, and compete together. We're committed to helping every member discover their 
            potential and become part of a thriving chess community.
          </p>
        </div>

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

        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg shadow-lg p-8 mb-8 border-l-4 border-purple-600">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">💪 Join Us On This Journey!</h2>
          <p className="text-gray-700 leading-relaxed">
            We're looking for members of all skill levels—from complete beginners to experienced players. 
            This is an opportunity to be part of building something new and special at our school. 
            Help us establish a strong chess tradition!
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-lg shadow-lg p-8 border-l-4 border-red-600">
          <h2 className="text-2xl font-bold text-red-700 mb-4">👥 Leadership & Advisors</h2>
          <p className="text-gray-700 mb-4">
            Our club is led by passionate students and faculty advisors dedicated to fostering intellectual growth and creating 
            an inclusive chess community from the start.
          </p>
          <p className="text-gray-600 text-sm font-medium">
            If you'd like to get involved or have questions, feel free to contact us at any time!
          </p>
        </div>
      </div>
    </div>
  );
};
