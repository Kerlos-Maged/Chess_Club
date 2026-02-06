import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChessAnimation, FloatingChessPiece, ChessSequenceAnimation } from '../components/Common';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Home = () => {
  // Scroll animation refs for different sections
  const programsRef = useScrollAnimation();
  const statsRef = useScrollAnimation();
  const coachesRef = useScrollAnimation();
  const schoolRef = useScrollAnimation();
  const joinRef = useScrollAnimation();

  // Events state for accordion/modal
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [modalEvent, setModalEvent] = useState(null);

  const eventsList = [
    {
      id: 'e1',
      title: 'Monthly Tournament',
      date: 'Last Saturday of every month',
      time: '3:00 PM - 6:00 PM',
      summary: "Competitive monthly tournament for all levels.",
      details:
        "Join our monthly tournament where players across all grades compete. There are prizes for top finishers and coaching feedback for improving players. Bring your A-game and sportsmanship!",
      type: 'tournament',
    },
    {
      id: 'e2',
      title: 'Training Sessions',
      date: 'Tue & Thu',
      time: '4:00 PM',
      summary: "Weekly coaching & strategy sessions.",
      details:
        "Structured training led by experienced club members focusing on openings, middlegame strategy and endgames. Open to beginners and advanced players — all are welcome.",
      type: 'training',
    },
    {
      id: 'e3',
      title: 'Social Meetups',
      date: 'Fridays',
      time: '3:30 PM',
      summary: "Casual games & community evenings.",
      details:
        "A relaxed meetup for friendly matches, puzzles and community time. Great for making friends and enjoying chess outside of competition.",
      type: 'social',
    },
  ];

  const toggleExpand = (id) => {
    setExpandedEvent(expandedEvent === id ? null : id);
  };

  const openModal = (event) => setModalEvent(event);
  const closeModal = () => setModalEvent(null);

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
    <div className="min-h-screen bg-white pt-28">
      {/* Hero Section with Chess Board Background & Chess Motif */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden">
        {/* Floating Chess Pieces Motif - Animated */}
        <div className="absolute top-10 left-10 text-7xl opacity-20 pointer-events-none select-none animate-pulse">♔</div>
        <div className="absolute bottom-10 right-10 text-7xl opacity-20 pointer-events-none select-none animate-pulse" style={{animationDelay: '0.5s'}}>♞</div>
        <div className="absolute top-1/3 right-1/4 text-6xl opacity-15 pointer-events-none select-none animate-bounce" style={{animationDelay: '0.3s'}}>♕</div>
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
        {/* Subtle chess piece overlay */}
        <div className="absolute top-1/2 left-1/4 text-6xl opacity-10 pointer-events-none select-none">♕</div>
        
        <div className="relative h-screen max-w-7xl mx-auto px-6 flex items-center justify-center z-10">
          <div className="w-full md:w-3/4 text-center animate-fade-in">
            <div className="inline-block bg-yellow-600/30 px-4 py-2 rounded-full mb-6 border border-yellow-500/60">
              <span className="text-yellow-300 font-bold text-sm">♔ Official School Club</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl text-amber-100">
              October Chess Club
            </h1>
            <p className="text-2xl text-yellow-100 mb-4 leading-relaxed font-semibold drop-shadow-lg">
              Where Every Move Matters
            </p>
            <p className="text-lg text-gray-50 mb-10 leading-relaxed drop-shadow-lg max-w-2xl mx-auto">
              Join our vibrant chess community. Compete, learn, and connect with passionate players. Every skill level is welcome—let's make every game memorable!
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

      {/* About Section - Chess Touch */}
      <section className="relative bg-slate-950 py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
            <div className="inline-block bg-gradient-to-r from-yellow-400/20 to-amber-400/20 px-4 py-2 rounded-full mb-6 border border-yellow-400/50">
              <span className="text-yellow-300 font-bold text-sm">♔ Newly Founded Club</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-amber-100 mb-6">About October Chess Club</h2>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed font-medium">
                October Chess Club is more than a club—it's a movement. We foster critical thinking, strategic planning, and lasting friendships through chess.
              </p>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed font-medium">
                Beginners and experts alike are welcome. Join us for tournaments, training, and social events. Discover your next great move!
              </p>
              <Link
                to="/about"
                className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-lg transition transform hover:scale-105 shadow-lg"
              >
                Learn More →
              </Link>
            </div>

            {/* Right Image */}
            <div className="flex justify-center relative">
              {/* Chess piece overlay */}
              <div className="absolute -top-8 -right-8 text-5xl opacity-15 pointer-events-none select-none">♖</div>
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
          <h2 className="text-5xl font-bold mb-6 text-amber-100">Why Join Us?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold mb-4 text-slate-100">Master Your Game</h3>
              <p className="text-slate-300 font-medium leading-relaxed">Learn from experienced players, discover new strategies, and develop your tactical vision.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold mb-4 text-slate-100">Build Friendships</h3>
              <p className="text-slate-300 font-medium leading-relaxed">Connect with fellow enthusiasts, share strategies, and create lasting memories around the board.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold mb-4 text-slate-100">Compete & Win</h3>
              <p className="text-slate-300 font-medium leading-relaxed">Face off in tournaments, prove your skill, and earn recognition in our vibrant community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events & Tournaments Section - Chess Touch */}
      <section className="relative bg-slate-950 py-24 overflow-hidden">
        <div className="absolute inset-0">
          {/* Mesh Gradient Background */}
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-600/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-yellow-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
          
          {/* Grid Pattern Overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-15" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#60a5fa" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          {/* Dot Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
            <defs>
              <pattern id="dots" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="2" fill="#fbbf24" opacity="0.6"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <style>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>

        <div className="relative max-w-7xl mx-auto px-6">


          <div className="text-center mb-12">
            {/* Chess piece badge */}
            <div className="absolute left-0 top-0 text-6xl opacity-10 pointer-events-none select-none">♙</div>
            <div className="inline-block bg-gradient-to-r from-yellow-400/20 to-amber-400/20 px-4 py-2 rounded-full mb-4 border border-yellow-400/50">
              <span className="text-yellow-300 font-bold text-sm">♖ TOURNAMENTS & EVENTS</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-amber-100">Events Made</h2>
          </div>

          {/* Events Grid - Card Design */}
          <div className="grid gap-6 md:grid-cols-3">
            {eventsList.map((ev) => (
              <div
                key={ev.id}
                className="group bg-gradient-to-br from-slate-900/60 to-slate-900/40 rounded-2xl p-4 border border-slate-700/30 hover:shadow-2xl transform hover:-translate-y-1 transition"
              >
                <div className="relative overflow-hidden rounded-xl h-44 mb-4">
                  <ImagePlaceholder title={ev.title} subtitle={ev.date} />
                  {/* Overlay chess piece */}
                  <div className="absolute bottom-2 right-2 text-4xl opacity-10 pointer-events-none select-none">{ev.type === 'tournament' ? '♔' : ev.type === 'training' ? '♞' : '♙'}</div>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-amber-100">{ev.title}</h3>
                    <p className="text-slate-300 text-sm mt-1 line-clamp-3">{ev.summary}</p>
                  </div>

                  <div className="text-right">
                    <div className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-slate-800 bg-amber-300/80">{ev.type}</div>
                    <p className="text-sm text-slate-400 mt-2">{ev.time}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <button onClick={() => openModal(ev)} className="px-4 py-2 rounded-lg bg-amber-400 text-slate-900 font-semibold hover:brightness-95 transition">Details</button>
                  <button className="px-4 py-2 rounded-lg bg-transparent border border-slate-700 text-white hover:bg-slate-800/30 transition">Register</button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal for Event Details */}
          {modalEvent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/60" onClick={closeModal}></div>
              <div className="relative bg-slate-900 rounded-2xl p-8 max-w-2xl mx-4 shadow-2xl border border-slate-700/40">
                <h3 className="text-2xl font-bold text-amber-100 mb-2">{modalEvent.title}</h3>
                <p className="text-sm text-slate-400 mb-4">{modalEvent.date} · {modalEvent.time}</p>
                <p className="text-slate-300 leading-relaxed">{modalEvent.details}</p>
                <div className="mt-6 flex justify-end gap-3">
                  <button onClick={closeModal} className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white">Close</button>
                </div>
              </div>
            </div>
          )}


        </div>
      </section>

      {/* Contact Form Section */}
      <section ref={joinRef} className="relative bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800 text-white py-32 scroll-animate overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6 animate-fade-in-up">
          <div className="text-center mb-12">
            <h2 className="text-5xl text-amber-100  md:text-6xl font-bold mb-4 ">Contact Us</h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              Questions, feedback, or just want to say hello? Reach out and we'll get back to you soon!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Contact Information - Left Side - Prestigious Design */}
            <div className="space-y-12">
              <div>
                <h3 className="text-4xl font-bold text-white mb-2">Contact Information</h3>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-amber-400 rounded-full"></div>
              </div>
              
              {/* Phone */}
              <div className="border-l-4 border-blue-400 pl-6">
                <p className="text-sm text-blue-300 font-semibold uppercase tracking-wider mb-2">Phone</p>
                <a href="tel:+1234567890" className="text-2xl text-white font-bold hover:text-blue-300 transition">
                  +1 (234) 567-890
                </a>
                <p className="text-slate-400 text-sm mt-2">Available Mon - Fri, 3:00 PM - 6:00 PM</p>
              </div>

              {/* Email */}
              <div className="border-l-4 border-amber-400 pl-6">
                <p className="text-sm text-amber-300 font-semibold uppercase tracking-wider mb-2">Email</p>
                <a href="mailto:chess@school.com" className="text-2xl text-white font-bold hover:text-amber-300 transition break-all">
                  chess@school.com
                </a>
                <p className="text-slate-400 text-sm mt-2">We respond within 24 hours</p>
              </div>

              {/* Location */}
              <div className="border-l-4 border-slate-300 pl-6">
                <p className="text-sm text-slate-300 font-semibold uppercase tracking-wider mb-2">Location</p>
                <p className="text-xl text-white font-bold">October School</p>
                <p className="text-slate-400 text-sm mt-1">Chess Club Room</p>
              </div>
            </div>

            {/* Contact Form - Right Side */}
            <div className="bg-gradient-to-br from-slate-700/30 to-slate-800/30 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-slate-600/20">
              <h3 className="text-3xl font-bold text-white mb-8">Send us a Message</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-3">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 border-b-2 border-slate-500 hover:border-blue-400 focus:border-blue-300 focus:outline-none transition text-white bg-transparent placeholder-slate-500 font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-3">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border-b-2 border-slate-500 hover:border-blue-400 focus:border-blue-300 focus:outline-none transition text-white bg-transparent placeholder-slate-500 font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-3">Subject</label>
                  <input
                    type="text"
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 border-b-2 border-slate-500 hover:border-blue-400 focus:border-blue-300 focus:outline-none transition text-white bg-transparent placeholder-slate-500 font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-3">Message</label>
                  <textarea
                    placeholder="Your message here..."
                    rows="4"
                    className="w-full px-4 py-3 border-b-2 border-slate-500 hover:border-blue-400 focus:border-blue-300 focus:outline-none transition text-white bg-transparent placeholder-slate-500 font-medium resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold px-8 py-4 rounded-lg transition text-lg transform hover:scale-105 shadow-lg mt-8"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

