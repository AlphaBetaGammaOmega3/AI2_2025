const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tiposuser', {
    idtipouser: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descricao: {
      type: DataTypes.CHAR(256),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tiposuser',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_tiposuser",
        unique: true,
        fields: [
          { name: "idtipouser" },
        ]
      },
      {
        name: "tiposuser_pk",
        unique: true,
        fields: [
          { name: "idtipouser" },
        ]
      },
    ]
  });
};
