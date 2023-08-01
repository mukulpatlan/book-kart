const express = require("express");

const router = express.Router();

const { postAddProducts, getAddProducts } = require("../controllers/products");

// handlebar/ejs
router.get("/add-product", getAddProducts);

// pug
// router.get("/add-product", (req, res, next) => {
//   // res.sendFile(path.join(rootdir, "views", "add-product.html"));
//   res.render("add-product", {
//     pageTitle: "Add Product",
//     path: "/admin/add-product",
//   });
// });

router.post("/add-product", postAddProducts);

// exports.routes = router;
// exports.products = products;

module.exports = router;
