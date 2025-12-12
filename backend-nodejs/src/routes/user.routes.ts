import { Router } from 'express';
import userController from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// All user routes require authentication
router.use(authenticate);

router.get('/me', userController.getProfile.bind(userController));
router.get('/favorites', userController.getFavorites.bind(userController));
router.post('/favorites/:filmId', userController.addFavorite.bind(userController));
router.delete('/favorites/:filmId', userController.removeFavorite.bind(userController));
router.get('/history', userController.getHistory.bind(userController));
router.post('/history/:filmId', userController.updateProgress.bind(userController));

export default router;
