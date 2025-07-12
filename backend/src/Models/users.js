const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    iduser: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idtipouser: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tiposuser',
        key: 'idtipouser'
      }
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    morada: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_users",
        unique: true,
        fields: [
          { name: "iduser" },
        ]
      },
      {
        name: "relationship_1_fk",
        fields: [
          { name: "idtipouser" },
        ]
      },
      {
        name: "users_pk",
        unique: true,
        fields: [
          { name: "iduser" },
        ]
      },
    ]
  });
};
