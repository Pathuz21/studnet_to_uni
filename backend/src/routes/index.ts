import express from 'express';
import authRoutes from './auth';
import communityRoutes from './community';
import careerPredictorRoutes from './careerPredictorRoutes';

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/community', communityRoutes);
router.use('/career-predictor', careerPredictorRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

export default router; 