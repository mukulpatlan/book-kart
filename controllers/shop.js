// const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then((products) => {
    res.render("shop/product-list", {
      pageTitle: "All Products",
      prods: products,
      path: "/products",
    });
  });
};

exports.getProductDetails = (req, res, next) => {
  const pId = req.params.productId;
  Product.findByID(pId).then((product) => {
    res.render("shop/product-details", {
      pageTitle: "Product Details",
      path: "/products",
      prod: product,
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then((products) => {
    res.render("shop/index", {
      pageTitle: "Shop",
      prods: products,
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cartProd) => {
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        cart: cartProd,
        path: "/cart",
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const id = req.body.productId;
  Product.findByID(id)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteCartItem = (req, res, next) => {
  const id = req.body.productId;
  req.user
    .postDeleteCartItem(id)
    .then(() => {
      console.log("deleted");
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .addOrder()
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  Product.fetchAll().then((products) => {
    res.render("shop/checkout", {
      pageTitle: "Checkout",
      prods: products,
      path: "/checkout",
    });
  });
};
