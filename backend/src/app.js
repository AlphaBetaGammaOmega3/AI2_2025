const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./Models');

// Rotas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const tiposUsersRoutes = require('./routes/tiposusersRoutes');
const tiposprodutosRoutes = require('./routes/tiposprodutosRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const carrinhoRoutes = require('./routes/carrinhoRoutes');
const vendasRoutes = require('./routes/vendasRoutes');
const vendasitensRoutes = require('./routes/vendasitensRoutes');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(express.json());

// Headers CORS customizados
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

// Rotas principais
app.use('/api', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tiposusers', tiposUsersRoutes);
app.use('/api/tiposprodutos', tiposprodutosRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/carrinhos', carrinhoRoutes);
app.use('/api/vendas', vendasRoutes);
app.use('/api/vendasitens', vendasitensRoutes);

// Sincronizar a bd
(async () => {
  try {
    // sincronizar primeiro tabelas sem dependências
    await db.tiposuser.sync({ alter: true });
    await db.tiposproduto.sync({ alter: true });

    // depois as tabelas que dependem delas
    await db.users.sync({ alter: true });
    await db.produtos.sync({ alter: true });

    // depois as tabelas intermediárias
    await db.carrinhos.sync({ alter: true });
    await db.vendas.sync({ alter: true });
    await db.vendas_itens.sync({ alter: true });

    // garantir tipos de user padrão
    await db.tiposuser.findOrCreate({
      where: { idtipouser: 1 },
      defaults: { descricao: 'admin' }
    });

    await db.tiposuser.findOrCreate({
      where: { idtipouser: 2 },
      defaults: { descricao: 'cliente' }
    });

    // garantir tipos de produto padrão
    const tiposProdutosPadrao = [
      "Calçado",
      "Calças",
      "Camisas",
      "Camisolas",
      "Casaco",
      "T-Shirt"
    ];

    for (const descricao of tiposProdutosPadrao) {
      await db.tiposproduto.findOrCreate({
        where: { descricao },
        defaults: { descricao }
      });
    }

    // criar user admin padrão, se não existir
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const [adminUser, created] = await db.users.findOrCreate({
      where: { email: 'admin@gmail.com' },
      defaults: {
        nome: 'Administrador',
        email: 'admin@gmail.com',
        password: hashedPassword,
        morada: 'Sede',
        idtipouser: 1
      }
    });

    if (created) {
      console.log("🔑 Utilizador admin padrão criado (admin@gmail.com / admin123)");
    } else {
      console.log("🔑 Utilizador admin padrão já existe");
    }

    console.log("🟢 Tabelas sincronizadas, dados iniciais criados e conexão OK.");
  } catch (err) {
    console.error("🔴 Erro ao sincronizar tabelas:", err.message);
  }
})();

// Iniciar o servidor
app.listen(app.get('port'), () => {
  console.log(`🚀 Servidor iniciado na porta ${app.get('port')}`);
});
