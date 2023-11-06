// const Cart = require("../models/cart");
const Order = require("../models/order");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.find().then((products) => {
    res.render("shop/product-list", {
      pageTitle: "All Products",
      prods: products,
      path: "/products",
    });
  }).catch((err) => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  })
};

exports.getProductDetails = (req, res, next) => {
  const pId = req.params.productId;
  Product.findById(pId).then((product) => {
    res.render("shop/product-details", {
      pageTitle: "Product Details",
      path: "/products",
      prod: product,
    });
  }).catch((err) => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  })
};

exports.getIndex = (req, res, next) => {
  Product.find().then((products) => {
    res.render("shop/index", {
      pageTitle: "Shop",
      prods: products,
      path: "/",
    });
  }).catch((err) => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  })
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const cart = { products: user.cart.items, total: user.cart.total };
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        cart: cart,
        path: "/cart",
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    })
};

exports.postCart = (req, res, next) => {
  const id = req.body.productId;
  Product.findById(id)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    })
};

exports.postDeleteCartItem = (req, res, next) => {
  const id = req.body.productId;
  req.user
    .postDeleteCartItem(id)
    .then(() => {
      console.log("deleted");
      res.redirect("/cart");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    })
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return {
          product: { ...i.productId._doc },
          quantity: i.quantity,
        };
      });
      const order = new Order({
        user: {
          email: req.session.user.email,
          userId: req.session.user,
        },
        products: products,
        total: user.cart.total,
      });
      return order.save();
    })
    .then((result) => {
      return req.user.clearCart();
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    })
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.session.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    })
};

exports.getCheckout = (req, res, next) => {
  Product.fetchAll().then((products) => {
    res.render("shop/checkout", {
      pageTitle: "Checkout",
      prods: products,
      path: "/checkout",
    });
  }).catch((err) => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  })
};
