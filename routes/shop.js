const express = require("express");
// const path = require('path');

const router = express.Router();

const adminData = require("./admin");

// handlebars/ejs route
router.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render("shop", {
    pageTitle: "Shop",
    prods: products,
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    isProdStyle: true,
  });
});

// pug route
// router.get("/", (req, res, next) => {
//   // res.sendFile(path.join(rootdir, 'views', 'shop.html'));
//   const products = adminData.products;
//   res.render("shop", { pageTitle: "Shop", prods: products, path: "/" });
// });

module.exports = router;
