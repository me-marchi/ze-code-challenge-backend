import { config } from 'dotenv';
config();
import express from 'express';
import { userRouter } from './routes/partner.router';

const app = express();
app.use(express.json());
app.use(userRouter);

const port = process.env.PORT || 8000;
app.listen(port, async () => console.log(`Server running on port ${port}`));

export { app };
