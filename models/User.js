const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  googleId: {
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  referralLink: {
    type: DataTypes.STRING,
    unique: true,
  },
  referrals: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  probability: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
  timer: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // in seconds
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = User;