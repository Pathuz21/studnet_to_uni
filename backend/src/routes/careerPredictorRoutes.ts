import express from 'express';
import { generatePredictions, getPredictionHistory, submitFeedback } from '../controllers/careerPredictorController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Generate career predictions
router.post('/predict', generatePredictions);

// Get user's prediction history
router.get('/history', getPredictionHistory);

// Submit feedback for predictions
router.post('/feedback', submitFeedback);

export default router; 