import { Router } from 'express';
import { User } from './models/User';
import { Team } from './models/Team';
import { Activity } from './models/Activity';
import { Leaderboard } from './models/Leaderboard';
import { Workout } from './models/Workout';

const router = Router();

const createResourceRoutes = (resource: string) => {
  router.get(`/api/${resource}/`, async (_req, res) => {
    try {
      let items;
      if (resource === 'users') {
        items = await User.find({});
      } else if (resource === 'teams') {
        items = await Team.find({});
      } else if (resource === 'activities') {
        items = await Activity.find({});
      } else if (resource === 'leaderboard') {
        items = await Leaderboard.find({});
      } else {
        items = await Workout.find({});
      }
      res.json({ resource, items });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });

  router.post(`/api/${resource}/`, async (req, res) => {
    try {
      let created;
      if (resource === 'users') {
        created = await User.create(req.body);
      } else if (resource === 'teams') {
        created = await Team.create(req.body);
      } else if (resource === 'activities') {
        created = await Activity.create(req.body);
      } else if (resource === 'leaderboard') {
        created = await Leaderboard.create(req.body);
      } else {
        created = await Workout.create(req.body);
      }
      res.status(201).json({ resource, data: created });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create data' });
    }
  });

  router.get(`/api/${resource}/:id`, async (req, res) => {
    try {
      let item;
      if (resource === 'users') {
        item = await User.findById(req.params.id);
      } else if (resource === 'teams') {
        item = await Team.findById(req.params.id);
      } else if (resource === 'activities') {
        item = await Activity.findById(req.params.id);
      } else if (resource === 'leaderboard') {
        item = await Leaderboard.findById(req.params.id);
      } else {
        item = await Workout.findById(req.params.id);
      }
      res.json({ resource, item });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });

  router.put(`/api/${resource}/:id`, async (req, res) => {
    try {
      let updated;
      if (resource === 'users') {
        updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      } else if (resource === 'teams') {
        updated = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
      } else if (resource === 'activities') {
        updated = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
      } else if (resource === 'leaderboard') {
        updated = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
      } else {
        updated = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
      }
      res.json({ resource, data: updated });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update data' });
    }
  });

  router.delete(`/api/${resource}/:id`, async (req, res) => {
    try {
      if (resource === 'users') {
        await User.findByIdAndDelete(req.params.id);
      } else if (resource === 'teams') {
        await Team.findByIdAndDelete(req.params.id);
      } else if (resource === 'activities') {
        await Activity.findByIdAndDelete(req.params.id);
      } else if (resource === 'leaderboard') {
        await Leaderboard.findByIdAndDelete(req.params.id);
      } else {
        await Workout.findByIdAndDelete(req.params.id);
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete data' });
    }
  });
};

['users', 'teams', 'activities', 'leaderboard', 'workouts'].forEach(createResourceRoutes);

export default router;
