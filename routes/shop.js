const express = require("express");
// const path = require('path');

const router = express.Router();

const {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
} = require("../controllers/shop");

// handlebars/ejs route
router.get("/", getProducts);
router.get("/products", getIndex);
router.get("/cart", getCart);
router.get("/orders", getOrders);
router.get("/checkout", getCheckout);
router.get("/product/:id", getProducts);

// pug route
// router.get("/", (req, res, next) => {
//   // res.sendFile(path.join(rootdir, 'views', 'shop.html'));
//   const products = adminData.products;
//   res.render("shop", { pageTitle: "Shop", prods: products, path: "/" });
// });

module.exports = router;
