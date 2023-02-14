import { sequelize } from '../utils/db.js';
import { DataTypes } from 'sequelize';

export const Subordinate = sequelize.define('subordinate', {
  id: {
    field: 'user_id',
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  subordinateId: {
    field: 'subordinate_id',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  supervisorId: {
    field: 'supervisor_id',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},
{
  tableName: 'users_subordinates',
  updatedAt: false,
});

