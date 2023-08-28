import express from 'express';
import sql from 'mssql';
import { v4 as uuidv4 } from 'uuid';
import configDB from '../config/database-config.js';
import admin from 'firebase-admin'
import { createRequire } from "module";

//Read json file the ES module way
const require = createRequire(import.meta.url);
const serviceAccount = require("../config/serviceAccountKey.json");

const router = express.Router();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const verifyFirebaseToken = async (token) => {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      throw new Error("Invalid Firebase Token");
    }
  };

const verifyTokenMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = await verifyFirebaseToken(token);
    req.user = decodedToken; // Attach user information to the request object for later use
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

router.use(verifyTokenMiddleware);

const randomNumberMaximum = 10000;
const generateRandomNumber = () => {
    return Math.floor(Math.random() * randomNumberMaximum);
};

router.post('/start-game', async (req, res) => {
    const gameId = uuidv4();
    const randomNumber = generateRandomNumber();
    const query = `
          INSERT INTO games (game_id, random_number, finished)
          VALUES ('${gameId}', ${randomNumber}, 0);
          `;
    try {
        const pool = await sql.connect(configDB);
        await pool.request().query(query);
        res.send({ gameId, randomNumber });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/make-guess', async (req, res) => {
    const gameId = req.body.gameId;
    const guess = req.body.guess;

    const query = `
  SELECT random_number, finished 
  FROM games 
  WHERE game_id = @gameId
  `;
    try {
        const pool = await sql.connect(configDB);
        const result = await pool.request().input('gameId', sql.UniqueIdentifier, gameId).query(query);

        const { random_number, finished } = result.recordset[0];

        if (finished) {
            res.send({ gameOver: true, message: 'The game is already over.' });
        } else {
            // Check if the guess is correct.
            if (guess === random_number) {
                res.send({ correct: true });
            } else if (guess < random_number) {
                res.send({ guessIsSmaller: true });
            } else {
                res.send({ guessIsLarger: true });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while processing your guess.' });
    }
});

//Vad ska hända med spel som inte blir färdiga? Sparas som finished=false i databasen?
router.post('/delete-game', async (req, res) => {
  const gameId = req.body.gameId;
  const query = `
      DELETE FROM games 
      WHERE game_id = @gameId
  `;
  try {
      const pool = await sql.connect(configDB);
      await pool.request().input('gameId', sql.UniqueIdentifier, gameId).query(query);
      res.send({ message: 'Game deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'An error occurred while deleting the game.' });
  }
});

export default router;