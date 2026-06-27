import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';
import { connectToDatabase, disconnectFromDatabase } from '../config/database';

// Seed the octofit_db database with test data
const seedDatabase = async () => {
  await connectToDatabase();
  console.log('Connected to MongoDB for seeding');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    { name: 'Maya Chen', email: 'maya@example.com', fitnessGoal: 'Build endurance', level: 'Intermediate' },
    { name: 'Jordan Lee', email: 'jordan@example.com', fitnessGoal: 'Lose weight', level: 'Beginner' },
    { name: 'Alicia Gomez', email: 'alicia@example.com', fitnessGoal: 'Increase strength', level: 'Advanced' },
  ]);

  const teams = await Team.insertMany([
    { name: 'Peak Performers', sport: 'Running', members: [users[0].id, users[1].id] },
    { name: 'Iron Crew', sport: 'CrossFit', members: [users[2].id] },
  ]);

  await Activity.insertMany([
    { userId: users[0].id, type: 'Run', duration: 35, date: new Date('2026-06-25') },
    { userId: users[1].id, type: 'Cycling', duration: 45, date: new Date('2026-06-26') },
    { userId: users[2].id, type: 'Strength', duration: 60, date: new Date('2026-06-27') },
  ]);

  await Leaderboard.insertMany([
    { userId: users[0].id, score: 980, rank: 1 },
    { userId: users[1].id, score: 870, rank: 2 },
    { userId: users[2].id, score: 940, rank: 3 },
  ]);

  await Workout.insertMany([
    { name: 'Tempo Run', category: 'Cardio', duration: 30, difficulty: 'Intermediate' },
    { name: 'Full Body Strength', category: 'Strength', duration: 45, difficulty: 'Advanced' },
    { name: 'Yoga Flow', category: 'Mobility', duration: 20, difficulty: 'Beginner' },
  ]);

  console.log('Seed completed successfully');
  await disconnectFromDatabase();
};

seedDatabase().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
