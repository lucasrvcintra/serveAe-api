import express from 'express';
import { router } from './routes/routes';

const app = express();

app.use(express.json());
// app.use(cors()) instalar dependencia
app.use(router);

export { app };
