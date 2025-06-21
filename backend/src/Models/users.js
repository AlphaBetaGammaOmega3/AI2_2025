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
      type: DataTypes.CHAR(256),
      allowNull: true
    },
    email: {
      type: DataTypes.CHAR(256),
      allowNull: false
    },
    password: {
      type: DataTypes.CHAR(256),
      allowNull: false
    },
    morada: {
      type: DataTypes.CHAR(256),
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
