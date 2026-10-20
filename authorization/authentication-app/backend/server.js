import express from 'express';
import userRouter from './router/userRouter.js';
import fileAccessRouter from './router/file-access.js';
import { cors } from './controller/middleware/cors.js';

const app = express();
app.use(express.json());
app.use(cors);

app.use('/user', userRouter);
app.use('/files', fileAccessRouter);

app.listen(1000, () => {
  console.log('Server listening');
});
