import React from 'react';

export const About = () => {
  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-navy mb-8">About Chess Club</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            The Chess Club aims to promote the intellectual game of chess among our school community. 
            We provide opportunities for players of all skill levels to learn, compete, and enjoy this 
            timeless game together.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gold mb-4">What We Offer</h2>
          <ul className="text-gray-700 space-y-2">
            <li>✓ Weekly practice sessions</li>
            <li>✓ Monthly tournaments</li>
            <li>✓ Coaching for beginners</li>
            <li>✓ Training for advanced players</li>
            <li>✓ Social events and networking</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-navy mb-4">Leadership</h2>
          <p className="text-gray-700">
            Our club is led by dedicated students and faculty advisors passionate about chess and 
            fostering intellectual growth in our community.
          </p>
        </div>
      </div>
    </div>
  );
};
