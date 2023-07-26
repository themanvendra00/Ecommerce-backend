const express = require('express');
const { getCategories, postCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

const router = express.Router();

router.get('/', getCategories);
router.post('/create', postCategory);
router.patch('/update/:id', updateCategory);
router.delete('/remove/:id', deleteCategory)

module.exports = router;
