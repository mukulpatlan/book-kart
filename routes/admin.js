const express = require("express");
const path = require("path");

const router = express.Router();

const rootdir = require("../utils/path");

const products = [];

// handlebar/ejs
router.get("/add-product", (req, res, next) => {
  // res.sendFile(path.join(rootdir, "views", "add-product.html"));
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    isProdStyle: true,
    isFormStyle: true,
    activeAddProduct: true,
  });
});

// pug
// router.get("/add-product", (req, res, next) => {
//   // res.sendFile(path.join(rootdir, "views", "add-product.html"));
//   res.render("add-product", {
//     pageTitle: "Add Product",
//     path: "/admin/add-product",
//   });
// });

router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
