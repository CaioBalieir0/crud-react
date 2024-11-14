const { Op } = require("sequelize"); // Adicione esta linha
const Product = require("../models/product");

exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { search, category } = req.query;
    let filter = {};

    if (search) {
      filter.name = { [Op.like]: `%${search}%` };
    }
    if (category) {
      filter.category = { [Op.like]: `%${category}%` };
    }

    const { count, rows } = await Product.findAndCountAll({
      where: filter,
      limit,
      offset,
      order: [["name", "ASC"]],
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      products: rows,
    });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, amount, category } = req.body;

    if (!name || !price || amount === undefined || !category) {
      return res
        .status(400)
        .json({ error: "Todos os campos obrigatórios devem ser preenchidos" });
    }

    const newProduct = await Product.create({
      name,
      price,
      description,
      amount,
      category,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, amount, category } = req.body;
    const product = await Product.findByPk(id);

    if (product) {
      product.name = name || product.name;
      product.price = price !== undefined ? price : product.price;
      product.description = description || product.description;
      product.amount = amount !== undefined ? amount : product.amount;
      product.category = category || product.category;

      await product.save();
      res.json(product);
    } else {
      res.status(404).json({ error: "Produto não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (product) {
      await product.destroy();
      res.json({ message: "Produto deletado com sucesso" });
    } else {
      res.status(404).json({ error: "Produto não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
};
