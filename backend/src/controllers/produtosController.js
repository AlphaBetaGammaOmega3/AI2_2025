const { produtos, tiposproduto } = require('../Models');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Configuração do multer com garantia da pasta 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log('Pasta uploads criada dentro do multer storage');
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage }).single('imagem');

module.exports = {
  async findAll(req, res) {
    try {
      const allProdutos = await produtos.findAll({
        include: [{ model: tiposproduto, as: 'idtipoprod_tiposproduto' }],
      });
      return res.json(allProdutos);
    } catch (error) {
      console.error("Erro em findAll produtos:", error);
      return res.status(500).json({ error: error.message, stack: error.stack });
    }
  },

  async get(req, res) {
    try {
      const { idproduto } = req.params;
      const produto = await produtos.findByPk(idproduto, {
        include: [{ model: tiposproduto, as: 'idtipoprod_tiposproduto' }],
        attributes: { exclude: ['stock'] },
      });
      if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
      return res.json(produto);
    } catch (error) {
      console.error("Erro em get produto:", error);
      return res.status(500).json({ error: error.message, stack: error.stack });
    }
  },

  create(req, res) {
    upload(req, res, async (err) => {
      if (err) {
        console.error("Erro no upload da imagem:", err);
        return res.status(400).json({ error: 'Erro no upload da imagem.' });
      }

      console.log("req.body no create:", req.body);
      console.log("req.file no create:", req.file);

      try {
        const { idtipoprod, nome, valor, stock, tamanho } = req.body;

        const valorNum = valor ? Number(valor) : null;
        const stockNum = stock ? Number(stock) : null;
        const imagem = req.file ? `/uploads/${req.file.filename}` : null;

        const newProduto = await produtos.create({
          idtipoprod,
          nome,
          imagem,
          valor: valorNum,
          stock: stockNum,
          tamanho,
        });

        return res.status(201).json(newProduto);
      } catch (error) {
        console.error("Erro ao criar produto:", error);
        return res.status(500).json({ error: error.message, stack: error.stack });
      }
    });
  },

  update(req, res) {
    upload(req, res, async (err) => {
      if (err) {
        console.error("Erro no upload da imagem:", err);
        return res.status(400).json({ error: 'Erro no upload da imagem.' });
      }

      console.log("req.body no update:", req.body);
      console.log("req.file no update:", req.file);

      try {
        const { idproduto } = req.params;
        const { idtipoprod, nome, valor, stock, tamanho } = req.body;

        const valorNum = valor ? Number(valor) : null;
        const stockNum = stock ? Number(stock) : null;

        const produto = await produtos.findByPk(idproduto);
        if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

        const novaImagem = req.file ? `/uploads/${req.file.filename}` : produto.imagem;

        await produto.update({
          idtipoprod,
          nome,
          imagem: novaImagem,
          valor: valorNum,
          stock: stockNum,
          tamanho,
        });

        return res.json(produto);
      } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        return res.status(500).json({ error: error.message, stack: error.stack });
      }
    });
  },

  async delete(req, res) {
    try {
      const { idproduto } = req.params;
      const produto = await produtos.findByPk(idproduto);
      if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

      if (produto.imagem && produto.imagem.startsWith('/uploads/')) {
        const filePath = path.join(__dirname, '..', produto.imagem);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`Imagem deletada: ${filePath}`);
        }
      }

      await produto.destroy();
      return res.json({ message: 'Produto removido com sucesso' });
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      return res.status(500).json({ error: error.message, stack: error.stack });
    }
  }
};
