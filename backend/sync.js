const db = require('./src/Models');

db.sequelize.sync({ alter: true }) // ou { force: true } ou { alter: true }
  .then(() => {
    console.log("Tabelas sincronizadas com sucesso.");
  })
  .catch(err => {
    console.error("Erro ao sincronizar tabelas:", err);
  });


//ficheiro para a criação da bd a partir dos Models e usando no terminal no backend node sync.js
