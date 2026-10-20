import express from 'express';
import { getUserById, getUsers, loginUser } from '../controller/userController.js';
import { checkUser, requireAuth } from '../controller/middleware/checkUserController.js';

const app = express();


app.get('/', requireAuth, getUsers)
app.post('/', checkUser, loginUser)
app.get('/:id', requireAuth, getUserById)

export default app;