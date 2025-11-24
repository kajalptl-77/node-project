import express from 'express';
import { registerUser, loginUser,addUser } from '../Controllers/UserController.js';

const router = express.Router();
router.post('/register', registerUser);
router.post('/Login', loginUser);
router.post('/firstnodeapi', addUser);


export default router;









