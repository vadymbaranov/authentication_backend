import { User } from '../models/Users.js';
import { registerUser, getByEmail } from '../services/usersService.js';
import { validatePassword } from '../services/passwordService.js';
import { validateAccessToken } from '../services/jwtService.js';

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
