import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './database/index.js';
import {router} from './route/shirtRoute.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

const PORT = 3001;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initializeDatabase();
});
