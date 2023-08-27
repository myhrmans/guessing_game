import express from 'express';
import bodyParser from 'body-parser';
import gamesRoutes from './routes/games.js';

import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(bodyParser.json());

app.use('/', gamesRoutes);
const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
