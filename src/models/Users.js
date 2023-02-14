import { sequelize } from '../utils/db.js';
import { DataTypes } from 'sequelize';
import { Subordinate } from './Subordinates.js';

export const User = sequelize.define('users', {
  id: {
    field: 'user_id',
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  firstName: {
    field: 'first_name',
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    field: 'last_name',
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adminId: {
    field: 'admin_id',
    type: DataTypes.INTEGER,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  supervisorId: {
    field: 'supervisor_id',
    type: DataTypes.INTEGER,
  },
  salt: {
    type: DataTypes.STRING,
  },
},
{
  tableName: 'users',
  updatedAt: false,
});

User.belongsTo(Subordinate, {
  foreignKey: 'id',
  constraints: false,
})
