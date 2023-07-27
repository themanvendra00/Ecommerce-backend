const express = require('express');
const { registerUser } = require('../controllers/authController');
const { loginUser } = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           description: User's email
 *         password:
 *           type: string
 *           description: User's password
 *       example:
 *         name: John Doe
 *         email: john@gmail.com
 *         password: mypassword123
 */



/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successful registration
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post('/register', registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login Successful
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/login', loginUser);

module.exports = router;
