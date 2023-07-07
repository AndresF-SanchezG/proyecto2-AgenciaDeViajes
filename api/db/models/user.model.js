const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
    nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  

  },

  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,

  },
  telefono: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,

  }


}

class User extends Model {
  static associate() {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User  }



