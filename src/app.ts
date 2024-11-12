import express from 'express';
import cors from 'cors';
import { router } from './routes/routes';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);
export { app };
