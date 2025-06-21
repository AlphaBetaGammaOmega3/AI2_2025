const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tiposproduto', {
    idtipoprod: {
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
    tableName: 'tiposproduto',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_tiposproduto",
        unique: true,
        fields: [
          { name: "idtipoprod" },
        ]
      },
      {
        name: "tiposproduto_pk",
        unique: true,
        fields: [
          { name: "idtipoprod" },
        ]
      },
    ]
  });
};
