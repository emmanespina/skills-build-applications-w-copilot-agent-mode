"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const Team_1 = require("../models/Team");
const Activity_1 = require("../models/Activity");
const Leaderboard_1 = require("../models/Leaderboard");
const Workout_1 = require("../models/Workout");
// Seed the octofit_db database with test data
const seedDatabase = async () => {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
    await mongoose_1.default.connect(mongoUri);
    console.log('Connected to MongoDB for seeding');
    await Promise.all([
        User_1.User.deleteMany({}),
        Team_1.Team.deleteMany({}),
        Activity_1.Activity.deleteMany({}),
        Leaderboard_1.Leaderboard.deleteMany({}),
        Workout_1.Workout.deleteMany({}),
    ]);
    const users = await User_1.User.insertMany([
        { name: 'Maya Chen', email: 'maya@example.com', fitnessGoal: 'Build endurance', level: 'Intermediate' },
        { name: 'Jordan Lee', email: 'jordan@example.com', fitnessGoal: 'Lose weight', level: 'Beginner' },
        { name: 'Alicia Gomez', email: 'alicia@example.com', fitnessGoal: 'Increase strength', level: 'Advanced' },
    ]);
    const teams = await Team_1.Team.insertMany([
        { name: 'Peak Performers', sport: 'Running', members: [users[0].id, users[1].id] },
        { name: 'Iron Crew', sport: 'CrossFit', members: [users[2].id] },
    ]);
    await Activity_1.Activity.insertMany([
        { userId: users[0].id, type: 'Run', duration: 35, date: new Date('2026-06-25') },
        { userId: users[1].id, type: 'Cycling', duration: 45, date: new Date('2026-06-26') },
        { userId: users[2].id, type: 'Strength', duration: 60, date: new Date('2026-06-27') },
    ]);
    await Leaderboard_1.Leaderboard.insertMany([
        { userId: users[0].id, score: 980, rank: 1 },
        { userId: users[1].id, score: 870, rank: 2 },
        { userId: users[2].id, score: 940, rank: 3 },
    ]);
    await Workout_1.Workout.insertMany([
        { name: 'Tempo Run', category: 'Cardio', duration: 30, difficulty: 'Intermediate' },
        { name: 'Full Body Strength', category: 'Strength', duration: 45, difficulty: 'Advanced' },
        { name: 'Yoga Flow', category: 'Mobility', duration: 20, difficulty: 'Beginner' },
    ]);
    console.log('Seed completed successfully');
    await mongoose_1.default.disconnect();
};
seedDatabase().catch((error) => {
    console.error('Seeding failed', error);
    process.exit(1);
});
