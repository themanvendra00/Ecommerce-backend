# E-Commerce API

Deployed Link: https://amaranth-gorilla-cape.cyclic.app/
Swagger docs: https://amaranth-gorilla-cape.cyclic.app/api-docs/

The E-Commerce API is a set of RESTful endpoints that support various e-commerce operations such as product and category listing, product details, cart management, and order processing. The API uses MongoDB as the database to manage product/category data, user cart information, and order details. JSON Web Tokens (JWT) are used for user authentication and token management.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database](#database)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- Category Listing: Retrieve a list of categories.
- Product Listing: Retrieve a list of products with essential details based on category ID.
- Product Details: Fetch detailed information about a specific product by its ID.
- Cart Management: Add products to the cart, view the cart, update quantities, and remove items.
- Order Placement: Place an order with products from the cart.
- Order History: Fetch the order history for authenticated users.
- Order Details: Retrieve the detailed information of a specific order by its ID.
- User Authentication: Register, log in, and obtain JWT token for API requests.


## Getting Started

1. Clone the repository:

```
https://github.com/themanvendra00/Ecommerce-backend.git
cd Ecommerce-backend
```

2. Install dependencies:
```
npm install
```

3. Set up the MongoDB connection by creating a .env file in the root directory with the following content:
```
PORT=8080;
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Replace your_secret_key with a secret key for JWT token encryption.

4. Start the server:
```
npm start
```

The API should now be running at http://localhost:8080.

## API Endpoints
The API supports the following endpoints:

- `Category Listing`: GET /categories
- `Product Listing`: GET /products/:categoryId
- `Product Details`: GET /products/productdetails/:productId
- `Cart Management`:
    - Add to Cart: POST /cart/addtocart
    - View Cart: GET /cart
    - Update Cart Item Quantity: PATCH /cart/updatecart
    - Remove from Cart: DELETE /cart/removecart
- `Order Placement`:
    - Place Order: POST /orders/place
    - Order History: GET /orders/history
    - Order Details: GET /orders/:orderId
- `User Authentication`:
    - User Registration: POST /users/register
    - User Login: POST /users/login

## Authentication

To access protected endpoints (cart management and order placement), include a valid JWT token in the `Authorization` header of the request:

```
Authorization: your_jwt_token
```

To obtain a JWT token, register a user using the `/users/register` endpoint, and then log in using the `/users/login` endpoint.

## Database

The API uses MongoDB to store and manage product data, user cart information, and order details. The MongoDB connection URI is set in the `.env` file.
