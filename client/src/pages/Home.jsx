import React from 'react';
import { Link } from 'react-router-dom';
import { ChessLogo } from '../components/ChessLogo';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Home = () => {
  // Scroll animation refs for different sections
  const programsRef = useScrollAnimation();
  const statsRef = useScrollAnimation();
  const coachesRef = useScrollAnimation();
  const schoolRef = useScrollAnimation();
  const joinRef = useScrollAnimation();
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background */}
      <section className="relative bg-gradient-to-br from-navy via-blue to-navy text-white py-32 overflow-hidden">
        {/* Background School Theme */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="z-10">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                Chess Club
              </h1>
              <p className="text-xl text-gray-200 mb-2 leading-relaxed font-semibold">
                Elevate Your Game
              </p>
              <p className="text-lg text-gray-300 mb-10 leading-relaxed">
                Join our school's premier chess community. Compete in tournaments, improve your skills, and become part of a legacy of champions.
              </p>
              <div className="flex gap-4">
                <a
                  href="#join"
                  className="bg-gold text-navy font-bold px-8 py-4 rounded hover:bg-yellow-400 transition shadow-lg text-lg"
                >
                  Become a Member
                </a>
                <a
                  href="#competitions"
                  className="border-2 border-gold text-gold font-bold px-8 py-4 rounded hover:bg-gold hover:text-navy transition text-lg"
                >
                  Explore Competitions
                </a>
              </div>
            </div>
            <div className="hidden md:flex justify-center items-center z-10">
              <div className="w-72 h-72 bg-gradient-to-br from-gold to-yellow-500 rounded-lg shadow-2xl flex items-center justify-center hover:scale-105 transition transform">
                <ChessLogo width={200} height={200} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Section: Hero Banner (Optional) */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg h-80 flex items-center justify-center relative overflow-hidden">
            {/* Image Placeholder */}
            <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-600 font-bold text-xl mb-2">Image Placeholder</p>
                <p className="text-gray-500">Recommended: Chess game action shot (1920x400px)</p>
                <p className="text-gray-500 text-sm mt-2">Or: School chess tournament or students playing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section ref={programsRef} className="py-24 bg-gray-50 scroll-animate">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-navy mb-4 text-center animate-fade-in-down">Our Programs</h2>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto text-lg">
            Comprehensive chess development programs designed for students of all levels
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tournaments */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition border-t-4 border-blue stagger-1 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="h-48 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center relative overflow-hidden">
                <div className="text-center">
                  <p className="text-gray-600 font-bold mb-2">Image Placeholder</p>
                  <p className="text-gray-500 text-sm">Tournament/Competition</p>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold text-navy mb-4">Tournaments</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Monthly competitive tournaments for all skill levels. Single-elimination and round-robin formats available.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="text-gold font-bold mr-2">▪</span> Blitz tournaments
                  </li>
                  <li className="flex items-center">
                    <span className="text-gold font-bold mr-2">▪</span> Rapid championships
                  </li>
                  <li className="flex items-center">
                    <span className="text-gold font-bold mr-2">▪</span> Classical matches
                  </li>
                </ul>
              </div>
            </div>

            {/* Training */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition border-t-4 border-gold stagger-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="h-48 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center relative overflow-hidden">
                <div className="text-center">
                  <p className="text-gray-600 font-bold mb-2">Image Placeholder</p>
                  <p className="text-gray-500 text-sm">Student Learning/Coaching</p>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold text-navy mb-4">Training Programs</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Structured coaching and training sessions led by experienced players and certified instructors.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="text-gold font-bold mr-2">▪</span> Beginner fundamentals
                  </li>
                  <li className="flex items-center">
                    <span className="text-gold font-bold mr-2">▪</span> Advanced strategy
                  </li>
                  <li className="flex items-center">
                    <span className="text-gold font-bold mr-2">▪</span> Endgame mastery
                  </li>
                </ul>
              </div>
            </div>

            {/* Community */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition border-t-4 border-navy stagger-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="h-48 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center relative overflow-hidden">
                <div className="text-center">
                  <p className="text-gray-600 font-bold mb-2">Image Placeholder</p>
                  <p className="text-gray-500 text-sm">Group/Community Event</p>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold text-navy mb-4">Community</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Connect with fellow chess players. Attend meetings, participate in group activities, and build lasting friendships.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="text-gold font-bold mr-2">▪</span> Weekly meetups
                  </li>
                  <li className="flex items-center">
                    <span className="text-gold font-bold mr-2">▪</span> Online platform
                  </li>
                  <li className="flex items-center">
                    <span className="text-gold font-bold mr-2">▪</span> Social events
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About School Section */}
      <section ref={schoolRef} className="bg-gradient-to-r from-navy to-blue text-white py-24 scroll-animate">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h2 className="text-5xl font-bold mb-6">School Chess Club</h2>
              <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                Our chess club is an integral part of our school's extracurricular programs. We're dedicated to fostering intellectual growth, strategic thinking, and competitive spirit among our students.
              </p>
              <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                Whether you're a complete beginner or an experienced player, our supportive community welcomes all chess enthusiasts ready to learn and grow.
              </p>
              <div className="flex gap-4">
                <div className="border-l-4 border-gold pl-4">
                  <p className="text-gold font-bold">Mission</p>
                  <p className="text-gray-300">Develop critical thinking and strategic skills</p>
                </div>
                <div className="border-l-4 border-gold pl-4">
                  <p className="text-gold font-bold">Vision</p>
                  <p className="text-gray-300">Create a thriving chess community</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center animate-fade-in-right">
              <div className="w-full max-w-md h-96 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center relative overflow-hidden shadow-2xl">
                <div className="text-center">
                  <p className="text-gray-600 font-bold text-xl mb-4">Image Placeholder</p>
                  <p className="text-gray-500 mb-2">School Building/Campus</p>
                  <p className="text-gray-500 text-sm">or Chess Hall</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section with School Theme */}
      <section ref={statsRef} className="bg-navy text-white py-24 relative overflow-hidden scroll-animate">
        {/* School Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-gold via-transparent to-blue"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div className="bg-navy/50 backdrop-blur-sm p-8 rounded-lg border border-gold/20 hover:border-gold/50 transition stagger-1 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-6xl font-bold text-gold mb-2">150+</div>
              <p className="text-gray-300 text-lg">Active Members</p>
              <p className="text-gray-400 text-sm mt-2">Students from all grades</p>
            </div>
            <div className="bg-navy/50 backdrop-blur-sm p-8 rounded-lg border border-gold/20 hover:border-gold/50 transition stagger-2 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-6xl font-bold text-gold mb-2">50+</div>
              <p className="text-gray-300 text-lg">Events Annually</p>
              <p className="text-gray-400 text-sm mt-2">Tournaments & competitions</p>
            </div>
            <div className="bg-navy/50 backdrop-blur-sm p-8 rounded-lg border border-gold/20 hover:border-gold/50 transition stagger-3 animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-6xl font-bold text-gold mb-2">200+</div>
              <p className="text-gray-300 text-lg">Rating Points</p>
              <p className="text-gray-400 text-sm mt-2">Average rating growth</p>
            </div>
            <div className="bg-navy/50 backdrop-blur-sm p-8 rounded-lg border border-gold/20 hover:border-gold/50 transition stagger-4 animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-6xl font-bold text-gold mb-2">100%</div>
              <p className="text-gray-300 text-lg">Free Access</p>
              <p className="text-gray-400 text-sm mt-2">Open to all students</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section ref={coachesRef} className="py-24 bg-gray-50 scroll-animate">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-navy mb-4 text-center animate-fade-in-down">Meet Our Coaches</h2>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto text-lg">
            Learn from experienced players and dedicated coaches
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Coach 1 */}
            <div className="text-center stagger-1 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="mb-6 flex justify-center">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center border-4 border-gold hover:scale-105 transition">
                  <div className="text-center">
                    <p className="text-gray-600 font-bold">Photo</p>
                    <p className="text-gray-500 text-sm">Coach/Advisor</p>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-2">Head Coach</h3>
              <p className="text-gray-600 mb-4">Expert instructor with 10+ years experience</p>
              <p className="text-gold font-semibold">Master Chess Player</p>
            </div>

            {/* Coach 2 */}
            <div className="text-center stagger-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="mb-6 flex justify-center">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center border-4 border-gold hover:scale-105 transition">
                  <div className="text-center">
                    <p className="text-gray-600 font-bold">Photo</p>
                    <p className="text-gray-500 text-sm">Advisor</p>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-2">Assistant Coach</h3>
              <p className="text-gray-600 mb-4">Passionate about developing young talent</p>
              <p className="text-gold font-semibold">Tournament Player</p>
            </div>

            {/* Coach 3 */}
            <div className="text-center stagger-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="mb-6 flex justify-center">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center border-4 border-gold hover:scale-105 transition">
                  <div className="text-center">
                    <p className="text-gray-600 font-bold">Photo</p>
                    <p className="text-gray-500 text-sm">Coordinator</p>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-2">Club Coordinator</h3>
              <p className="text-gray-600 mb-4">Organizes events and manages logistics</p>
              <p className="text-gold font-semibold">Administrator</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Players Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-navy mb-4 text-center">Top Players</h2>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto text-lg">
            Our highest-rated members leading the competition
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue to-navy text-white p-6 text-center">
                <div className="text-4xl font-bold mb-2">1</div>
                <h3 className="text-2xl font-bold">Top Ranked</h3>
              </div>
              <div className="p-6 text-center">
                <p className="text-gray-600 text-lg">Check leaderboard for top player</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-gold to-yellow-500 text-navy p-6 text-center">
                <div className="text-4xl font-bold mb-2">2</div>
                <h3 className="text-2xl font-bold">Second Place</h3>
              </div>
              <div className="p-6 text-center">
                <p className="text-gray-600 text-lg">View complete rankings</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-gray-400 to-gray-600 text-white p-6 text-center">
                <div className="text-4xl font-bold mb-2">3</div>
                <h3 className="text-2xl font-bold">Third Place</h3>
              </div>
              <div className="p-6 text-center">
                <p className="text-gray-600 text-lg">Rising competitors</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/leaderboard"
              className="bg-navy text-white font-bold px-8 py-4 rounded hover:bg-blue transition inline-block text-lg"
            >
              View Full Leaderboard
            </Link>
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section ref={joinRef} className="bg-gradient-to-r from-navy to-blue text-white py-24 scroll-animate">
        <div className="max-w-4xl mx-auto px-6 text-center animate-fade-in-up">
          <h2 className="text-5xl font-bold mb-6">Ready to Join?</h2>
          <p className="text-xl text-gray-200 mb-10">
            Start your chess journey with us today. No experience necessary, just passion for the game.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/join"
              className="bg-gold text-navy font-bold px-8 py-4 rounded hover:bg-yellow-400 transition text-lg"
            >
              Become a Member
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white font-bold px-8 py-4 rounded hover:bg-white hover:text-navy transition text-lg"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
