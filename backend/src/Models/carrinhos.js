const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('carrinhos', {
    idprod: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'produtos',
        key: 'idprod'
      }
    },
    iduser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'iduser'
      }
    },
    quantidade: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'carrinhos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "carrinhos_pk",
        unique: true,
        fields: [
          { name: "idprod" },
          { name: "iduser" },
        ]
      },
      {
        name: "pk_carrinhos",
        unique: true,
        fields: [
          { name: "idprod" },
          { name: "iduser" },
        ]
      },
      {
        name: "relationship_10_fk",
        fields: [
          { name: "iduser" },
        ]
      },
      {
        name: "relationship_3_fk",
        fields: [
          { name: "idprod" },
        ]
      },
    ]
  });
};
