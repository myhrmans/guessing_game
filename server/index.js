import express from 'express';
import bodyParser from 'body-parser';
import gamesRoutes from './routes/games.js';
import { BearerStrategy } from 'passport-azure-ad';
import dotenv from 'dotenv';
import passport from 'passport';
import morgan from 'morgan';

//import passport from './config/passport-config.js';

dotenv.config();
const app = express();
// app.use(passport.initialize());

// const options = {
//     identityMetadata: `https://login.microsoftonline.com/${process.env.APP_TENANT_ID}/v2.0/.well-known/openid-configuration`, //v2 tenant-specific endpoint, required
//     clientID: process.env.APP_CLIENT_ID,
//   };

//   const bearerStrategy = new BearerStrategy(options, (token, done) => {
//     // Send user info using the second argument
//     done(null, { }, token);
// }
// );

// passport.use(bearerStrategy);


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// app.use(morgan('dev'));

app.use(bodyParser.json());

app.use('/', gamesRoutes);
const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
