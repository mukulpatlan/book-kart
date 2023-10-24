const express = require("express");
const { body } = require("express-validator");

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
router.post(
  "/edit-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("imageUrl").isURL(),
    body("price").isFloat(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  postEditProduct
);
router.post("/delete-product", isAuth, deleteProducts);
router.post(
  "/add-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("imageUrl").isURL(),
    body("price").isFloat(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  postAddProducts
);

module.exports = router;
