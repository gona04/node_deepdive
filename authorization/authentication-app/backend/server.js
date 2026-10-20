import express from 'express';
import userRouter from './router/userRouter.js';
import fileAccessRouter from './router/file-access.js'
import { requireAuth } from './controller/middleware/checkUserController.js';


const app = express();
app.use(express.json())
// Following can be used to do localhost:1000/file.txt and it will serve the file
// app.use(express.static('./public'))

app.use('/user', userRouter)
app.use('/files', requireAuth, fileAccessRouter)


app.listen(1000, () => {
    console.log('Server listening')
})
