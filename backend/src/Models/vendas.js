const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vendas', {
    idvenda: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    iduser: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'iduser'
      }
    },
    valorfinal: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    datacompra: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vendas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_vendas",
        unique: true,
        fields: [
          { name: "idvenda" },
        ]
      },
      {
        name: "relationship_4_fk",
        fields: [
          { name: "iduser" },
        ]
      },
      {
        name: "vendas_pk",
        unique: true,
        fields: [
          { name: "idvenda" },
        ]
      },
    ]
  });
};
