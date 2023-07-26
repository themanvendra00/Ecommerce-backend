const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db");

const app = express();
const port = process.env.PORT || 3000;

// Routes
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Triveous Team!");
});

// Routes
app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error connecting to DB", error);
  }
  console.log(`Server is running on http://localhost:${port}`);
});
