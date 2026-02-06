import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Admin } from '../src/models/Admin.js';
import { Event } from '../src/models/Event.js';

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Clear collections
    await Admin.deleteMany({});
    await Event.deleteMany({});
    console.log('✓ Cleared existing data');

    // Create default admin
    const admin = new Admin({
      email: 'admin@chess.club',
      password: 'Chess@2024',
      name: 'Chess Club Admin',
    });
    await admin.save();
    console.log('✓ Admin user created (admin@chess.club / Chess@2024)');

    // Create sample events
    const events = [
      {
        title: 'Weekly Practice Session',
        description: 'Come join us for a casual chess game with friends',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        time: '16:00',
        location: 'Room 101 - Building A',
        category: 'training',
        capacity: 20,
      },
      {
        title: 'Lightning Tournament',
        description: '5-minute rapid fire chess tournament. All skill levels welcome!',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        time: '15:30',
        location: 'Auditorium',
        category: 'tournament',
        capacity: 32,
      },
      {
        title: 'Beginner Training',
        description: 'Learn chess basics from experienced players',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        time: '17:00',
        location: 'Room 101 - Building A',
        category: 'training',
        capacity: 15,
      },
      {
        title: 'Club Social & Games',
        description: 'Casual hangout with chess, snacks, and fun',
        date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        time: '18:00',
        location: 'Cafeteria',
        category: 'social',
      },
    ];

    await Event.insertMany(events);
    console.log(`✓ Created ${events.length} sample events`);

    console.log('\n✓ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDB();
