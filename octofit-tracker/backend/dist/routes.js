"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("./models/User");
const Team_1 = require("./models/Team");
const Activity_1 = require("./models/Activity");
const Leaderboard_1 = require("./models/Leaderboard");
const Workout_1 = require("./models/Workout");
const router = (0, express_1.Router)();
const createResourceRoutes = (resource) => {
    router.get(`/api/${resource}/`, async (_req, res) => {
        try {
            let items;
            if (resource === 'users') {
                items = await User_1.User.find({});
            }
            else if (resource === 'teams') {
                items = await Team_1.Team.find({});
            }
            else if (resource === 'activities') {
                items = await Activity_1.Activity.find({});
            }
            else if (resource === 'leaderboard') {
                items = await Leaderboard_1.Leaderboard.find({});
            }
            else {
                items = await Workout_1.Workout.find({});
            }
            res.json({ resource, items });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    });
    router.post(`/api/${resource}/`, async (req, res) => {
        try {
            let created;
            if (resource === 'users') {
                created = await User_1.User.create(req.body);
            }
            else if (resource === 'teams') {
                created = await Team_1.Team.create(req.body);
            }
            else if (resource === 'activities') {
                created = await Activity_1.Activity.create(req.body);
            }
            else if (resource === 'leaderboard') {
                created = await Leaderboard_1.Leaderboard.create(req.body);
            }
            else {
                created = await Workout_1.Workout.create(req.body);
            }
            res.status(201).json({ resource, data: created });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to create data' });
        }
    });
    router.get(`/api/${resource}/:id`, async (req, res) => {
        try {
            let item;
            if (resource === 'users') {
                item = await User_1.User.findById(req.params.id);
            }
            else if (resource === 'teams') {
                item = await Team_1.Team.findById(req.params.id);
            }
            else if (resource === 'activities') {
                item = await Activity_1.Activity.findById(req.params.id);
            }
            else if (resource === 'leaderboard') {
                item = await Leaderboard_1.Leaderboard.findById(req.params.id);
            }
            else {
                item = await Workout_1.Workout.findById(req.params.id);
            }
            res.json({ resource, item });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    });
    router.put(`/api/${resource}/:id`, async (req, res) => {
        try {
            let updated;
            if (resource === 'users') {
                updated = await User_1.User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            }
            else if (resource === 'teams') {
                updated = await Team_1.Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
            }
            else if (resource === 'activities') {
                updated = await Activity_1.Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
            }
            else if (resource === 'leaderboard') {
                updated = await Leaderboard_1.Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
            }
            else {
                updated = await Workout_1.Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
            }
            res.json({ resource, data: updated });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to update data' });
        }
    });
    router.delete(`/api/${resource}/:id`, async (req, res) => {
        try {
            if (resource === 'users') {
                await User_1.User.findByIdAndDelete(req.params.id);
            }
            else if (resource === 'teams') {
                await Team_1.Team.findByIdAndDelete(req.params.id);
            }
            else if (resource === 'activities') {
                await Activity_1.Activity.findByIdAndDelete(req.params.id);
            }
            else if (resource === 'leaderboard') {
                await Leaderboard_1.Leaderboard.findByIdAndDelete(req.params.id);
            }
            else {
                await Workout_1.Workout.findByIdAndDelete(req.params.id);
            }
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to delete data' });
        }
    });
};
['users', 'teams', 'activities', 'leaderboard', 'workouts'].forEach(createResourceRoutes);
exports.default = router;
