const db = require('./src/Models');

async function syncModels() {
  try {
    // Sincronizar primeiro os modelos base, que não dependem de outros
    await db.tiposproduto.sync({ alter: true });
    await db.tiposuser.sync({ alter: true });

    // Depois os modelos que dependem dos anteriores
    await db.users.sync({ alter: true });
    await db.produtos.sync({ alter: true });

    // Agora os modelos que dependem dos anteriores
    await db.vendas.sync({ alter: true });
    await db.carrinhos.sync({ alter: true });
    await db.vendas_itens.sync({ alter: true });

    console.log("Tabelas sincronizadas em ordem com sucesso.");
  } catch (error) {
    console.error("Erro ao sincronizar tabelas:", error);
  }
}

syncModels();
