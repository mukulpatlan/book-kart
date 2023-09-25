const express = require("express");

const router = express.Router();

const isAuth = require("../middlewares/is-auth");

const {
  postAddProducts,
  getAddProducts,
  getProducts,
  getEditProduct,
  postEditProduct,
  deleteProducts,
} = require("../controllers/admin");

router.get("/add-product", isAuth, getAddProducts);
router.get("/products", isAuth, getProducts);
router.get("/edit-product/:productId", isAuth, getEditProduct);
router.post("/edit-product", isAuth, postEditProduct);
router.post("/delete-product", isAuth, deleteProducts);
router.post("/add-product", isAuth, postAddProducts);

module.exports = router;
