const express = require("express");
// const path = require('path');

const router = express.Router();

const {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  getProductDetails,
  postCart,
  postDeleteCartItem,
} = require("../controllers/shop");

// handlebars/ejs route
router.get("/", getProducts);
router.get("/products", getIndex);
router.get("/cart", getCart);
router.post("/cart", postCart);
router.post("/cart-item-delete", postDeleteCartItem);
router.get("/orders", getOrders);
router.get("/checkout", getCheckout);
router.get("/products/delete");
router.get("/products/:productId", getProductDetails);

// pug route
// router.get("/", (req, res, next) => {
//   // res.sendFile(path.join(rootdir, 'views', 'shop.html'));
//   const products = adminData.products;
//   res.render("shop", { pageTitle: "Shop", prods: products, path: "/" });
// });

module.exports = router;
