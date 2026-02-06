import React from 'react';
import { Link } from 'react-router-dom';
import { ChessLogo, ChessAnimation, FloatingChessPiece, ChessSequenceAnimation } from '../components/Common';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Home = () => {
  // Scroll animation refs for different sections
  const programsRef = useScrollAnimation();
  const statsRef = useScrollAnimation();
  const coachesRef = useScrollAnimation();
  const schoolRef = useScrollAnimation();
  const joinRef = useScrollAnimation();

  // Image placeholder utility with school-themed icons
  const ImagePlaceholder = ({ icon, title, subtitle }) => (
    <div className="w-full h-full bg-gradient-to-br from-slate-700/20 via-slate-800/10 to-slate-900/20 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full flex items-center justify-center text-8xl">{icon}</div>
      </div>
      <div className="text-center z-10">
        <div className="text-5xl mb-3">{icon}</div>
        <p className="text-slate-900 font-bold text-lg mb-1">{title}</p>
        <p className="text-gray-600 text-sm">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Chess Board Background */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden">
        {/* Chess Board Grid Background */}
        <div className="absolute inset-0 w-full">
          {/* 8x8 Chess board squares with logical piece placement */}
          <div className="grid grid-cols-8 w-full h-screen">
            {[...Array(64)].map((_, idx) => {
              const row = Math.floor(idx / 8);
              const col = idx % 8;
              const isWhiteSquare = (row + col) % 2 === 0;
              
              // Realistic chess starting position
              // White pieces on rows 0-1 (bottom), Black pieces on rows 6-7 (top)
              const chessBoard = {
                // Black pieces (top)
                0: { 0: '♜', 1: '♞', 2: '♝', 3: '♛', 4: '♚', 5: '♝', 6: '♞', 7: '♜' }, // Black back row
                1: { 0: '♟', 1: '♟', 2: '♟', 3: '♟', 4: '♟', 5: '♟', 6: '♟', 7: '♟' }, // Black pawns
                // White pieces (bottom)
                6: { 0: '♙', 1: '♙', 2: '♙', 3: '♙', 4: '♙', 5: '♙', 6: '♙', 7: '♙' }, // White pawns
                7: { 0: '♖', 1: '♘', 2: '♗', 3: '♕', 4: '♔', 5: '♗', 6: '♘', 7: '♖' }, // White back row
              };
              
              const piece = chessBoard[row]?.[col];
              
              return (
                <div
                  key={idx}
                  className={`relative w-full h-full flex items-center justify-center text-5xl md:text-6xl font-bold border border-slate-600/40 transition transform hover:scale-110 duration-300 ${
                    isWhiteSquare
                      ? 'bg-gradient-to-br from-blue-800/40 to-blue-700/30'
                      : 'bg-gradient-to-br from-slate-700/40 to-slate-800/40'
                  }`}
                >
                  {piece && (
                    <span className="text-white drop-shadow-lg opacity-60 pointer-events-none chess-piece-animate">
                      {piece}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Strong overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-950/80 pointer-events-none"></div>
        
        <div className="relative h-screen max-w-7xl mx-auto px-6 flex items-center justify-center z-10">
          <div className="w-full md:w-3/4 text-center animate-fade-in">
            <div className="inline-block bg-yellow-600/30 px-4 py-2 rounded-full mb-6 border border-yellow-500/60">
              <span className="text-yellow-300 font-bold text-sm">♔ Official School Club</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl text-blue-300">
              October Chess Club
            </h1>
            <p className="text-xl text-yellow-100 mb-4 leading-relaxed font-semibold drop-shadow-lg">
              Start Your Chess Journey Today
            </p>
            <p className="text-lg text-gray-50 mb-10 leading-relaxed drop-shadow-lg max-w-2xl mx-auto">
              Join our newly founded chess community. Compete in tournaments, improve your skills, and help build something special together.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#join"
                className="bg-gradient-to-r from-blue-500 to-blue-400 text-white font-bold px-8 py-4 rounded-lg hover:from-blue-400 hover:to-blue-300 transition shadow-lg text-lg transform hover:scale-105 border border-blue-300"
              >
                Join Now
              </a>
              <a
                href="/competitions"
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold px-8 py-4 rounded-lg hover:from-blue-500 hover:to-blue-400 transition text-lg transform hover:scale-105 border-2 border-yellow-500 shadow-lg"
              >
                View Tournaments
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - EARLY */}
      <section className="relative bg-slate-950 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-block bg-yellow-400/20 px-4 py-2 rounded-full mb-6 border border-yellow-400/50">
                <span className="text-yellow-300 font-bold text-sm">✨ Newly Founded</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-slate-100 mb-6">About October Chess Club</h2>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed font-medium">
                A newly founded initiative bringing chess to our school community. We develop critical thinking, strategic planning, and build meaningful friendships through the ancient game of chess.
              </p>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed font-medium">
                Whether beginner or experienced, we welcome all chess enthusiasts. Join our tournaments, training sessions, and community events.
              </p>
              <Link
                to="/about"
                className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-lg transition transform hover:scale-105 shadow-lg"
              >
                Learn More →
              </Link>
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-lg h-96 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/40 hover:shadow-3xl transition">
                <img 
                  src="/school.jpeg" 
                  alt="October Chess Club" 
                  className="w-full h-full object-cover hover:scale-105 transition transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-600/20 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-5xl font-bold mb-6 text-yellow-300">Why Join Us?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-slate-900 p-8 rounded-xl border border-slate-700/40 hover:border-yellow-400/40 hover:shadow-lg transition">
              <div className="text-5xl mb-4">♔</div>
              <h3 className="text-2xl font-bold mb-3 text-slate-100">Master Your Game</h3>
              <p className="text-slate-300 font-medium">Learn from experienced players and improve your chess skills at every level.</p>
            </div>
            <div className="bg-slate-900 p-8 rounded-xl border border-slate-700/40 hover:border-yellow-400/40 hover:shadow-lg transition">
              <div className="text-5xl mb-4">♕</div>
              <h3 className="text-2xl font-bold mb-3 text-slate-100">Build Friendships</h3>
              <p className="text-slate-300 font-medium">Connect with fellow chess enthusiasts and build lasting relationships.</p>
            </div>
            <div className="bg-slate-900 p-8 rounded-xl border border-slate-700/40 hover:border-yellow-400/40 hover:shadow-lg transition">
              <div className="text-5xl mb-4">♖</div>
              <h3 className="text-2xl font-bold mb-3 text-slate-100">Compete & Win</h3>
              <p className="text-slate-300 font-medium">Participate in tournaments and prove your chess mastery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events & Tournaments Section - Redesigned */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900/40 to-slate-900 py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Title Section */}
          <div className="text-center mb-20">
            <div className="inline-block bg-yellow-400/20 px-4 py-2 rounded-full mb-6 border border-yellow-400/50">
              <span className="text-yellow-300 font-bold text-sm">🏆 TOURNAMENTS & EVENTS</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-blue-300 to-yellow-300 bg-clip-text text-transparent">
              Upcoming Competitions
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium">
              Showcase your skills, compete with peers, and build unforgettable memories
            </p>
          </div>

          {/* Main Tournament Cards Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Featured Tournament */}
            <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all border border-slate-700/40 border-t-2 border-t-yellow-400 hover:scale-102">
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-600/30 to-slate-900">
                <ImagePlaceholder icon="🏆" title="Tournament Hall" subtitle="School Event Space" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              </div>
              <div className="p-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-3xl font-bold text-yellow-300 mb-2">Monthly Chess Tournament</h3>
                    <span className="inline-block bg-yellow-500/30 text-yellow-200 px-3 py-1 rounded-full text-sm font-bold">FEATURED EVENT</span>
                  </div>
                  <div className="text-5xl">♖</div>
                </div>
                <p className="text-slate-300 mb-8 text-lg font-medium leading-relaxed">
                  Our flagship competitive tournament where members compete across all skill levels. Win prizes, earn ratings, and claim your place among the best.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-700/40 p-4 rounded-xl border border-slate-600/40">
                    <p className="text-slate-400 text-sm font-bold mb-1">SCHEDULE</p>
                    <p className="text-yellow-300 font-bold">Last Saturday of Month</p>
                  </div>
                  <div className="bg-slate-700/40 p-4 rounded-xl border border-slate-600/40">
                    <p className="text-slate-400 text-sm font-bold mb-1">TIME</p>
                    <p className="text-yellow-300 font-bold">3:00 PM - 6:00 PM</p>
                  </div>
                  <div className="bg-slate-700/40 p-4 rounded-xl border border-slate-600/40">
                    <p className="text-slate-400 text-sm font-bold mb-1">PARTICIPANTS</p>
                    <p className="text-yellow-300 font-bold">20-40 Players</p>
                  </div>
                  <div className="bg-slate-700/40 p-4 rounded-xl border border-slate-600/40">
                    <p className="text-slate-400 text-sm font-bold mb-1">LEVEL</p>
                    <p className="text-yellow-300 font-bold">All Skills</p>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-slate-900 font-bold py-3 rounded-xl transition transform hover:scale-105 shadow-lg">
                  Register Now
                </button>
              </div>
            </div>

            {/* Secondary Events Stack */}
            <div className="space-y-6">
              {/* Training Sessions Card */}
              <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-slate-700/40 border-t-2 border-t-blue-400">
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-blue-600/30 to-slate-900">
                  <ImagePlaceholder icon="📚" title="Training Session" subtitle="Coaching & Strategy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                </div>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-blue-300 mb-2">Intensive Training</h3>
                    </div>
                    <div className="text-4xl">♗</div>
                  </div>
                  <p className="text-slate-300 mb-6 font-medium">
                    Develop your skills with experienced coaches covering openings, middle-game strategies, and endgame techniques.
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-slate-700/40 p-3 rounded-lg border border-slate-600/40">
                      <p className="text-blue-300 font-bold">Tue & Thu</p>
                      <p className="text-slate-400 text-xs">4:00-5:30 PM</p>
                    </div>
                    <div className="bg-slate-700/40 p-3 rounded-lg border border-slate-600/40">
                      <p className="text-blue-300 font-bold">Weekly</p>
                      <p className="text-slate-400 text-xs">All Levels</p>
                    </div>
                    <div className="bg-slate-700/40 p-3 rounded-lg border border-slate-600/40">
                      <p className="text-blue-300 font-bold">Free</p>
                      <p className="text-slate-400 text-xs">For Members</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Events Card */}
              <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-slate-700/40 border-t-2 border-t-purple-400">
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-purple-600/30 to-slate-900">
                  <ImagePlaceholder icon="🤝" title="Community Event" subtitle="Friendship & Fun" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                </div>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-purple-300 mb-2">Social Meetups</h3>
                    </div>
                    <div className="text-4xl">♘</div>
                  </div>
                  <p className="text-slate-300 mb-6 font-medium">
                    Connect with fellow chess enthusiasts, play casual games, and build lasting friendships within our community.
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-slate-700/40 p-3 rounded-lg border border-slate-600/40">
                      <p className="text-purple-300 font-bold">Fridays</p>
                      <p className="text-slate-400 text-xs">3:30-5:00 PM</p>
                    </div>
                    <div className="bg-slate-700/40 p-3 rounded-lg border border-slate-600/40">
                      <p className="text-purple-300 font-bold">Casual</p>
                      <p className="text-slate-400 text-xs">All Levels</p>
                    </div>
                    <div className="bg-slate-700/40 p-3 rounded-lg border border-slate-600/40">
                      <p className="text-purple-300 font-bold">Free</p>
                      <p className="text-slate-400 text-xs">No Sign-up</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery Section */}
          <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-3xl p-12 border border-slate-700/40 backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-yellow-300 mb-8 text-center">Tournament Highlights</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                <div className="relative h-64 bg-gradient-to-br from-blue-600/40 to-slate-900">
                  <ImagePlaceholder icon="🏅" title="Past Tournament" subtitle="Champions Crowned" />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <button className="bg-yellow-400 text-slate-900 font-bold px-6 py-2 rounded-lg hover:bg-yellow-300 transition">View Photo</button>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                <div className="relative h-64 bg-gradient-to-br from-green-600/40 to-slate-900">
                  <ImagePlaceholder icon="🎯" title="Strategy Coaching" subtitle="Expert Training" />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <button className="bg-yellow-400 text-slate-900 font-bold px-6 py-2 rounded-lg hover:bg-yellow-300 transition">View Photo</button>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                <div className="relative h-64 bg-gradient-to-br from-orange-600/40 to-slate-900">
                  <ImagePlaceholder icon="🎉" title="Club Celebration" subtitle="Member Gathering" />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <button className="bg-yellow-400 text-slate-900 font-bold px-6 py-2 rounded-lg hover:bg-yellow-300 transition">View Photo</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership CTA - Enhanced */}
      <section ref={joinRef} className="relative bg-gradient-to-b from-white via-slate-50 to-white text-slate-900 py-32 scroll-animate overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center animate-fade-in-up">
          <div className="inline-block bg-yellow-400/20 px-4 py-2 rounded-full mb-6 border border-yellow-400/50">
            <span className="text-yellow-600 font-bold text-sm">♔ Join The Club</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">Ready to Join?</h2>
          <p className="text-xl text-slate-700 mb-12 leading-relaxed font-medium">
            Start your chess journey with us today. No experience necessary, just passion for the game. 
            Whether you're a complete beginner or a competitive player, we have a place for you.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/join"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-4 rounded-lg transition text-lg transform hover:scale-105 shadow-lg"
            >
              Become a Member Today
            </Link>
            <Link
              to="/contact"
              className="border-2 border-yellow-400 text-yellow-600 font-bold px-10 py-4 rounded-lg hover:bg-yellow-400/10 transition text-lg transform hover:scale-105"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative bg-slate-100 text-slate-900 py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-700/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 px-4 py-2 rounded-full mb-6 border border-blue-300">
              <span className="text-blue-700 font-bold text-sm">♙ Get In Touch</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">Contact Us</h2>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto font-medium">
              Have questions about the club? Want to learn more about chess? Reach out to us anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="text-3xl">✉️</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-blue-700">Email</h4>
                  <a href="mailto:chess@school.com" className="text-slate-700 hover:text-blue-600 transition font-medium">
                    chess@school.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="text-3xl">📍</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-blue-700">Location</h4>
                  <p className="text-slate-700 font-medium">
                    School Campus<br/>
                    Room 201, Building A
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="text-3xl">🕐</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-blue-700">Hours</h4>
                  <p className="text-slate-700 font-medium">
                    Tue-Thu: 3-5 PM<br/>
                    Sat: 10 AM-2 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form - 2 columns */}
            <form className="md:col-span-2 bg-white border border-slate-200 rounded-xl p-8 space-y-6 shadow-lg">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Your name" 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-600 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-600 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                <input 
                  type="text" 
                  placeholder="What is this about?" 
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                <textarea 
                  placeholder="Your message..." 
                  rows="5"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-600 transition resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition transform hover:scale-105 shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

