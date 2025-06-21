const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vendas_itens', {
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
    idvenda: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'vendas',
        key: 'idvenda'
      }
    },
    quantidade: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    precounitario: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vendas_itens',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_relationship_5",
        unique: true,
        fields: [
          { name: "idprod" },
          { name: "idvenda" },
        ]
      },
      {
        name: "relationship_5_pk",
        unique: true,
        fields: [
          { name: "idprod" },
          { name: "idvenda" },
        ]
      },
      {
        name: "relationship_8_fk",
        fields: [
          { name: "idvenda" },
        ]
      },
      {
        name: "relationship_9_fk",
        fields: [
          { name: "idprod" },
        ]
      },
    ]
  });
};
