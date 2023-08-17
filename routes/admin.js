const express = require("express");

const router = express.Router();

const {
  postAddProducts,
  getAddProducts,
  getProducts,
  getEditProduct,
  postEditProduct,
  deleteProducts,
} = require("../controllers/admin");

router.get("/add-product", getAddProducts);
router.get("/products", getProducts);
router.get("/edit-product/:productId", getEditProduct);
router.post("/edit-product", postEditProduct);
router.post("/delete-product", deleteProducts);
router.post("/add-product", postAddProducts);

module.exports = router;
