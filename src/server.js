import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import passportConfig from './config/passport.js';
import { usersRouter } from './routes/users.js';

dotenv.config();

const router = express.Router();
const app = express();
const PORT = process.env.PORT || 5000;

passportConfig(passport);
app.use(passport.initialize());

app.use(cors({
  // origin: process.env.CLIENT_URL,
  // credentials: true,
}));

app.use(express.json());

app.use('/users', usersRouter);
app.use('/', router);

app.listen(PORT);
