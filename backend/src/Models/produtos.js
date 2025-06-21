const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('produtos', {
    idprod: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idtipoprod: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tiposproduto',
        key: 'idtipoprod'
      }
    },
    nome: {
      type: DataTypes.CHAR(256),
      allowNull: true
    },
    imagem: {
      type: DataTypes.CHAR(256),
      allowNull: true
    },
    valor: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    stock: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    tamanho: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'produtos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_produtos",
        unique: true,
        fields: [
          { name: "idprod" },
        ]
      },
      {
        name: "produtos_pk",
        unique: true,
        fields: [
          { name: "idprod" },
        ]
      },
      {
        name: "relationship_2_fk",
        fields: [
          { name: "idtipoprod" },
        ]
      },
    ]
  });
};
