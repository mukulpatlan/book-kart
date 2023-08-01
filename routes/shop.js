const express = require("express");
// const path = require('path');

const router = express.Router();

const { getProducts } = require("../controllers/products");

// handlebars/ejs route
router.get("/", getProducts);

// pug route
// router.get("/", (req, res, next) => {
//   // res.sendFile(path.join(rootdir, 'views', 'shop.html'));
//   const products = adminData.products;
//   res.render("shop", { pageTitle: "Shop", prods: products, path: "/" });
// });

module.exports = router;
