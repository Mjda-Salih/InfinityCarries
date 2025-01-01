"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false, // Ensures that name is always provided
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false, // Ensures that email is always provided
        unique: true, // Ensures no duplicate email entries
        validate: {
          isEmail: true, // Ensures the email is valid
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false, // Ensures that password is always provided
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  // Hook to hash the password before saving a user to the database
  User.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10); // Hash the password before saving it
    }
  });

  return User;
};
