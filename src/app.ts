import express from 'express';
import path from 'path';
import shirtRoutes from './routes/shirtRoutes';
import shortRoutes from './routes/shortRoutes';
import camperaRoutes from './routes/camperaRoutes';
import cartRoutes from './routes/CartRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
const port = 3000;

app.use('/public', express.static(path.join(__dirname, '../public')));

app.use(express.json());
app.use('/shirts', shirtRoutes);
app.use('/shorts', shortRoutes);
app.use('/camperas', camperaRoutes);
app.use('/cart', cartRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
