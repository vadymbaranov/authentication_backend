import express from 'express';
import passport from 'passport';
import { catchError } from '../middlewares/catchError.js';
import { register, login } from '../controllers/usersController.js';

export const usersRouter = express.Router();

usersRouter.post('/registration', catchError(register));
usersRouter.post('/login', passport.authenticate('jwt'), login);
usersRouter.post('/logout', register);
usersRouter.post('/users', register);

