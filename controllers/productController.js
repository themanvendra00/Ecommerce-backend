const Product = require('../models/product');
const Category = require('../models/category');

const getProduct = async (req,res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  
  try {
    const findCategory = await Category.findById(categoryId);
    if(!findCategory) return res.status(404).send({ message: "Category not found" });

    const products = await Product.find({ category: categoryId });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const addProduct = async (req,res) => {
    const {title, price, description, availability, category} = req.body;
    try {
        if(!title, !price, !description, !availability, !category) return res.send(404).send({ message: "Please Provied All details" });

        const findCategory = await Category.findById(category);
        if(!findCategory) return res.status(404).send({ message: "Category not found" });

        const newProduct = await Product({title, price, description, availability, category});
        newProduct.save();
        res.status(201).send({ message: "Product added successfully" });
    } catch (error) {
        console.error('Error posting product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateProduct = async (req,res) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).send({ message: "Product not found" });
    

    if (payload.category) {
      const findCategory = await Category.findOne({_id: payload.category});
      if (!findCategory) return res.status(404).send({ message: "Category not found" });
    }

    await Product.findByIdAndUpdate({ _id: id }, payload);
    res.status(200).send({ message: "Product updated successfully" });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const deleteProduct = async (req,res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).send({ message: "Product not found" });
    
    await Product.findByIdAndDelete({ _id: id });
    res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { getProduct, getProductsByCategory, getProductById, addProduct, updateProduct, deleteProduct };
