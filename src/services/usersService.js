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

  if (existingUser !== null) {
    return 'User with this email already exists';
  }

  if (existingUser === null) {
    const hashedPassword = hashPassword(password);
    const salt = hashedPassword.salt;
    const hash = hashedPassword.hash;

    const newUser = {
      firstName,
      lastName,
      email,
      role,
      password: hash,
      salt,
    };

    if (newUser.role === 'admin') {
      const users = await getAllUsers();
      const maxID = Math.max(users.map(user => user.adminId));

      const adminId = maxID > 0 ? maxID + 1 : 1;

      newUser.adminId = adminId;
    }

    if (newUser.role === 'supervisor') {
      const users = await getAllUsers();
      const maxID = Math.max(users.map(user => user.supervisorId));

      const supervisorId = maxID > 0 ? maxID + 1 : 1;

      newUser.supervisorId = supervisorId;
    }

    await User.create(newUser)

    return newUser;
  }
}

export async function getAllUsers() {
  return await User.findAll({
    order: ['id'],
  });
}

export function getAllSubordinates(supervisorId) {
  return Subordinate.findAll({
    where: {supervisorId},
  });
}

export async function getByEmail(email) {
  return await User.findOne({
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
