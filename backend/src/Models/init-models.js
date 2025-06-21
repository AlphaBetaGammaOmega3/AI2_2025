var DataTypes = require("sequelize").DataTypes;
var _carrinhos = require("./carrinhos");
var _produtos = require("./produtos");
var _tiposproduto = require("./tiposproduto");
var _tiposuser = require("./tiposuser");
var _users = require("./users");
var _vendas = require("./vendas");
var _vendas_itens = require("./vendas_itens");

function initModels(sequelize) {
  var carrinhos = _carrinhos(sequelize, DataTypes);
  var produtos = _produtos(sequelize, DataTypes);
  var tiposproduto = _tiposproduto(sequelize, DataTypes);
  var tiposuser = _tiposuser(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var vendas = _vendas(sequelize, DataTypes);
  var vendas_itens = _vendas_itens(sequelize, DataTypes);

  produtos.belongsToMany(users, { as: 'iduser_users', through: carrinhos, foreignKey: "idprod", otherKey: "iduser" });
  produtos.belongsToMany(vendas, { as: 'idvenda_vendas', through: vendas_itens, foreignKey: "idprod", otherKey: "idvenda" });
  users.belongsToMany(produtos, { as: 'idprod_produtos', through: carrinhos, foreignKey: "iduser", otherKey: "idprod" });
  vendas.belongsToMany(produtos, { as: 'idprod_produtos_vendas_itens', through: vendas_itens, foreignKey: "idvenda", otherKey: "idprod" });
  carrinhos.belongsTo(produtos, { as: "idprod_produto", foreignKey: "idprod"});
  produtos.hasMany(carrinhos, { as: "carrinhos", foreignKey: "idprod"});
  vendas_itens.belongsTo(produtos, { as: "idprod_produto", foreignKey: "idprod"});
  produtos.hasMany(vendas_itens, { as: "vendas_itens", foreignKey: "idprod"});
  produtos.belongsTo(tiposproduto, { as: "idtipoprod_tiposproduto", foreignKey: "idtipoprod"});
  tiposproduto.hasMany(produtos, { as: "produtos", foreignKey: "idtipoprod"});
  users.belongsTo(tiposuser, { as: "idtipouser_tiposuser", foreignKey: "idtipouser"});
  tiposuser.hasMany(users, { as: "users", foreignKey: "idtipouser"});
  carrinhos.belongsTo(users, { as: "iduser_user", foreignKey: "iduser"});
  users.hasMany(carrinhos, { as: "carrinhos", foreignKey: "iduser"});
  vendas.belongsTo(users, { as: "iduser_user", foreignKey: "iduser"});
  users.hasMany(vendas, { as: "vendas", foreignKey: "iduser"});
  vendas_itens.belongsTo(vendas, { as: "idvenda_venda", foreignKey: "idvenda"});
  vendas.hasMany(vendas_itens, { as: "vendas_itens", foreignKey: "idvenda"});

  return {
    carrinhos,
    produtos,
    tiposproduto,
    tiposuser,
    users,
    vendas,
    vendas_itens,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
