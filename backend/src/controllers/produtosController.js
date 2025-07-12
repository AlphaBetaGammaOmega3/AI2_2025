const { produtos, tiposproduto } = require('../Models'); 
const authorizeRoles = require('../middleware/authorizeRoles');

module.exports = {

  async findAll(req, res) {
  try {
const idtipouser = req.user?.idtipouser ?? null;

    const allProdutos = await produtos.findAll({
      include: [{ model: tiposproduto, as: 'idtipoprod_tiposproduto' }],
      //attributes: idtipouser === 1 ? undefined : { exclude: ['stock'] }
    });
    return res.json(allProdutos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
},

async get(req, res) {
  try {
    const { idproduto } = req.params;
    const idtipouser = req.user?.idtipouser ?? null;

    const produto = await produtos.findByPk(idproduto, {
      include: [{ model: tiposproduto, as: 'idtipoprod_tiposproduto' }],
      attributes: idtipouser === 1 ? undefined : { exclude: ['stock'] }
    });

    if (!produto) return res.status(404).json({ error: 'Produto not found' });
    return res.json(produto);
  } catch (error) {
    console.error("Erro ao obter produto:", error); 
    return res.status(500).json({ error: error.message });
  }
},


  async create(req, res) {
  try {
    const { idtipoprod, nome, imagem, valor, stock, tamanho } = req.body;
    const newProduto = await produtos.create({ idtipoprod, nome, imagem, valor, stock, tamanho });
    return res.status(201).json(newProduto);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
},

async update(req, res) {
  try {
    const { idproduto } = req.params;
    const { idtipoprod, nome, imagem, valor, stock, tamanho } = req.body;

    const produto = await produtos.findByPk(idproduto);
    if (!produto) return res.status(404).json({ error: 'Produto not found' });

    await produto.update({ idtipoprod, nome, imagem, valor, stock, tamanho });
    return res.json(produto);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
},


  async delete(req, res) {
    try {
      const { idproduto } = req.params;
      const produto = await produtos.findByPk(idproduto);
      if (!produto) return res.status(404).json({ error: 'Produto not found' });

      await produto.destroy();
      return res.json({ message: 'Produto deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

};
