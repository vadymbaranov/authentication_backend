import { User } from '../models/Users.js';
import { registerUser, getByEmail, getAllUsers, getAllSubordinates } from '../services/usersService.js';
import { validatePassword } from '../services/passwordService.js';

export async function register(req, res, next) {

  const newUser = await registerUser(req.body);

  res.send(newUser);
}

export async function login(req, res, next) {
  const { email, password } = req.body;
  const user = await getByEmail(email);
  const { id } = user;

  if (user === null) {
    return 'No user found';
  }

  const isValid = validatePassword(password, user.password, user.salt);

  if (isValid) {
    const accessToken = generateAccessToken(user);

    await User.update(
      {token: { accessToken }},
      {where: { id }},
    )

    res.sendStatus(200);
    res.send({
      user,
      accessToken,
    });
  }

  if (!isValid) {
    res.sendStatus(401);

    return 'The password entered is wrong';
  }
}

export async function getAll(req, res, next) {
  const users = await getAllUsers();

  res.send(users);
}

export async function getSubordinates(req, res, next) {
  const { supervisorId } = req.params;

  const users = await getAllSubordinates(supervisorId);

  res.send(users);
}
