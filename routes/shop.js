const express = require("express");
// const path = require('path');

const router = express.Router();
const isAuth = require("../middlewares/is-auth");

const {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  getProductDetails,
  postCart,
  postDeleteCartItem,
  postOrder,
} = require("../controllers/shop");

// handlebars/ejs route
router.get("/", getProducts);
router.get("/products", getIndex);
router.get("/cart", isAuth, getCart);
router.post("/cart", isAuth, postCart);
router.post("/cart-item-delete", isAuth, postDeleteCartItem);
router.get("/orders", isAuth, getOrders);
// router.get("/checkout", getCheckout);
// router.get("/products/delete");
router.get("/products/:productId", getProductDetails);
// router.get('/orders', getOrders);
router.post("/create-order", isAuth, postOrder);

// pug route
// router.get("/", (req, res, next) => {
//   // res.sendFile(path.join(rootdir, 'views', 'shop.html'));
//   const products = adminData.products;
//   res.render("shop", { pageTitle: "Shop", prods: products, path: "/" });
// });

module.exports = router;
