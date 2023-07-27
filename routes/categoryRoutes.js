const express = require('express');
const { getCategories, postCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Category name
 *       example:
 *         name: Electronics
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get a list of categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Internal server error
 */

router.get('/', getCategories);
router.post('/create', postCategory);
router.patch('/update/:id', updateCategory);
router.delete('/remove/:id', deleteCategory)

module.exports = router;
