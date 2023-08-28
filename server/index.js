import express from 'express';
import bodyParser from 'body-parser';
import gamesRoutes from './routes/games.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json());

app.use('/', gamesRoutes);
app.listen(process.env.PORT, () => console.log(`Server running on port: http://localhost:${process.env.PORT}`));
