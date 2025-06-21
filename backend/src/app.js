const express = require('express');
const cors = require('cors');
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

// Sincronizar o banco de dados
db.sequelize.sync()
  .then(() => {
    console.log("🟢 Conexão com a base de dados estabelecida.");
  })
  .catch((err) => {
    console.error("🔴 Erro ao conectar com a base de dados:", err.message);
  });

// Iniciar o servidor
app.listen(app.get('port'), () => {
  console.log(`🚀 Servidor iniciado na porta ${app.get('port')}`);
});