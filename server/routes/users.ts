import { Router, Request, Response } from 'express';
import { User } from '../models/schemas';

const router = Router();

// GET all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET a single user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// CREATE a new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, role, avatar, signature } = req.body;
    const newUser = new User({ name, email, role, avatar, signature });
    const saved = await newUser.save();
    res.status(201).json(saved);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// UPDATE a user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, email, role, avatar, signature } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role, avatar, signature },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE a user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
