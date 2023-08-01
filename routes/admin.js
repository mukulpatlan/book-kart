const express = require("express");

const router = express.Router();

const {
  postAddProducts,
  getAddProducts,
  getProducts,
} = require("../controllers/admin");

router.get("/add-product", getAddProducts);
router.get("/products", getProducts);
router.post("/add-product", postAddProducts);

module.exports = router;
