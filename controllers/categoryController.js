const Category = require('../models/category');

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const postCategory = async (req,res) => {
    const { name } = req.body;
    try {
        if(!name) return res.status(409).send({ message: "Please provide a valid category name" });

        const category = await Category.findOne({name});
        if(category) return res.send({message: 'Category already exists'});
        
        const newCategory = await Category({name:name.toLowerCase()});
        await newCategory.save();
        res.status(201).send({message:"New category added successfully"});
    } catch (error) {
        console.error('Error posting category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateCategory = async (req,res) => {
    const id = req.params.id;
    const name = req.body.name;
    try {
        const category = await Category.findOne({_id:id});
        if(!category) return res.status(404).send({message: 'Category not found!'});

        const updatedCategory = await Category.findByIdAndUpdate({_id:id},{name:name.toLowerCase()});
        res.status(200).send({ message: "Category updated successfully" });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteCategory = async (req,res) => {
    const id = req.params.id;
    try {
        const category = await Category.findOne({_id:id});
        if(!category) return res.status(404).send({message: 'Category not found!'});

        await Category.findByIdAndDelete({_id:id});
        res.status(200).send({ message: "Category deleted successfully" });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getCategories, postCategory, updateCategory, deleteCategory };
