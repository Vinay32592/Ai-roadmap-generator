import { Router, Request, Response } from 'express';
import { Roadmap } from '../models/schemas';

const router = Router();

// GET all roadmaps for a user
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const roadmaps = await Roadmap.find({ userId });
    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch roadmaps' });
  }
});

// GET a single roadmap by ID
router.get('/detail/:id', async (req: Request, res: Response) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);
    if (!roadmap) {
      return res.status(404).json({ error: 'Roadmap not found' });
    }
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch roadmap' });
  }
});

// CREATE a new roadmap
router.post('/', async (req: Request, res: Response) => {
  try {
    const { goal, steps, userId } = req.body;
    const newRoadmap = new Roadmap({
      goal,
      steps: steps || [],
      userId,
      status: 'Draft',
    });
    const saved = await newRoadmap.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create roadmap' });
  }
});

// UPDATE a roadmap
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { goal, steps, status } = req.body;
    const roadmap = await Roadmap.findByIdAndUpdate(
      req.params.id,
      { goal, steps, status },
      { new: true }
    );
    if (!roadmap) {
      return res.status(404).json({ error: 'Roadmap not found' });
    }
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update roadmap' });
  }
});

// DELETE a roadmap
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const roadmap = await Roadmap.findByIdAndDelete(req.params.id);
    if (!roadmap) {
      return res.status(404).json({ error: 'Roadmap not found' });
    }
    res.json({ message: 'Roadmap deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete roadmap' });
  }
});

export default router;
