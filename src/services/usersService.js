import { User } from '../models/Users.js';
import { hashPassword } from './passwordService.js';
import { generateAccessToken } from '../services/jwtService.js';
import { Subordinate } from '../models/Subordinates.js';

export async function registerUser(body) {
  const {
    firstName,
    lastName,
    email,
    role,
    password,
  } = body;

  const existingUser = await getByEmail(email);

  if (email === existingUser.email) {
    return 'User with this email already exists';
  }

  if (existingUser === null) {
    const hashedPassword = hashPassword(password);
    const salt = hashedPassword.salt;
    const hash = hashedPassword.hash;

    const accessToken = generateAccessToken(user);

    const newUser = {
      firstName,
      lastName,
      email,
      role,
      password: hash,
      token: accessToken,
      salt,
    };

    await User.create(newUser)

    return newUser;
  }
}

export function getAllUsers() {
  return User.findAll({
    order: ['id'],
  });
}

export function getAllSubordinates(supervisorId) {
  return Subordinate.findAll({
    where: {supervisorId},
  });
}

export function getByEmail(email) {
  return User.findOne({
    where: { email },
  });
}

export function changeSupervisor(user, newSupervisorId) {
  const { id, supervisorId } = user;

  User.update(
    { supervisorId: { newSupervisorId } },
    { where: { id }},
  );

  Subordinate.update(
    {supervisorId: { newSupervisorId }},
    { where: { supervisorId } },
  );
}

export function normalize({ email, firstName, lastName }) {
  return { firstName, lastName, email };
}


// export const getGoodById = async (goodId: number) => {
//   return Good.findByPk(goodId);
// };

// export const addGood = async (name: string, colorId: number) => {
//   const newGood = {
//     name,
//     colorId,
//   };

//   return Good.create(newGood);
// };

// export const removeGood = async (goodId: number) => {
//   return Good.destroy({
//     where: {
//       id: goodId,
//     },
//   });
// };
