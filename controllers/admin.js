const Product = require("../models/product");

exports.getAddProducts = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      pageTitle: "Admin Products",
      path: "/admin/products",
      prods: products,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;
  const product = new Product(productId, title, imageUrl, price, description);
  product.save();
  res.redirect("/admin/products");
};

exports.getEditProduct = (req, res, next) => {
  const isEdit = req.query.edit === "true";
  if (!isEdit) {
    res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findByID(prodId, (prod) => {
    if (!prod) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: isEdit,
      prod: prod,
    });
  });
};

exports.deleteProducts = (req, res, next) => {
  const prodId = req.body.productId;
  Product.delete(prodId, (prod) => {
    res.redirect("/admin/products");
  });
};

exports.postAddProducts = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(null, title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};
