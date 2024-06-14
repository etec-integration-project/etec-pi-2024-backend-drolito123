import express from 'express';
import bodyParser from 'body-parser';
import shirtRoutes from './routes/shirtRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', shirtRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});