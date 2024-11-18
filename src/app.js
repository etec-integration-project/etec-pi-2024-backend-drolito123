import express from 'express';
import cors from 'cors';
const { initializeDatabase } = require('./database');
const shirtsRoutes = require('./routes/shirtsRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', shirtsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initializeDatabase();
});
