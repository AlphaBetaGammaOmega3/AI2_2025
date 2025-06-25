const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const initModels = require("./init-models");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    freezeTableName: true
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Inicializar todos os modelos e associações
const models = initModels(sequelize);

// Atribuir cada modelo a db
db.carrinhos = models.carrinhos;
db.tiposproduto = models.tiposproduto;
db.produtos = models.produtos;
db.tiposuser = models.tiposuser;
db.users = models.users;
db.vendas = models.vendas;
db.vendas_itens = models.vendas_itens;

// Definir associação explícita para o alias usado no controller
db.users.belongsTo(db.tiposuser, { foreignKey: 'idtipouser', as: 'tipouser' });

module.exports = db;
