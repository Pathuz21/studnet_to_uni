import express from 'express';
import { authenticateToken } from '../middleware/auth';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  incrementViews,
} from '../controllers/communityController';

const router = express.Router();

// Public routes
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/:id/views', incrementViews);

// Protected routes
router.post('/', authenticateToken, createPost);
router.put('/:id', authenticateToken, updatePost);
router.delete('/:id', authenticateToken, deletePost);

export default router; 