const Product = require("../models/product");

exports.getAddProducts = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.getProducts = (req, res, next) => {
  Product.find().then((products) => {
    res.render("admin/products", {
      pageTitle: "Admin Products",
      path: "/admin/products",
      prods: products,
      isAuthenticated: req.session.isLoggedIn,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;
  Product.findById(productId).then((product) => {
    product.title = title;
    product.imageUrl = imageUrl;
    product.price = price;
    product.description = description;
    product.save().then((result) => {
      console.log("saved");
      res.redirect("/admin/products");
    });
  });
};

exports.getEditProduct = (req, res, next) => {
  const isEdit = req.query.edit === "true";
  if (!isEdit) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId).then((prod) => {
    if (!prod) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: isEdit,
      prod: prod,
      isAuthenticated: req.session.isLoggedIn,
    });
  });
};

exports.deleteProducts = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId).then(() => {
    res.redirect("/admin/products");
  });
};

exports.postAddProducts = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
    userId: req.user,
  });
  product
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
