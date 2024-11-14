import express from 'express';
import path from 'path';
import shirtRoutes from './routes/shirtRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/shirts', shirtRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
