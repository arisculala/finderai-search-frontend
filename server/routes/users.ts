import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.put('/:id/update-password', userController.updateUserPassword);

export default router;
