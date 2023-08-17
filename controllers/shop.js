const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      pageTitle: "All Products",
      prods: products,
      path: "/products",
    });
  });
};

exports.getProductDetails = (req, res, next) => {
  const pId = req.params.productId;
  Product.findByID(pId, (product) => {
    res.render("shop/product-details", {
      pageTitle: "Product Details",
      path: "/products",
      prod: product,
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      pageTitle: "Shop",
      prods: products,
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProd = [];
      if (cart) {
        for (const prod of products) {
          const cartProdData = cart.products.find((p) => p.id === prod.id);
          if (cartProdData) {
            cartProd.push({ prodData: prod, qty: cartProdData.qty });
          }
        }
      }
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        cart: cartProd,
        path: "/cart",
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const id = req.body.productId;
  Product.findByID(id, (product) => {
    Cart.add(id, product.price);
  });
  res.redirect("/cart");
};

exports.postDeleteCartItem = (req, res, next) => {
  const id = req.body.productId;
  Product.findByID(id, (product) => {
    Cart.deleteCart(id, product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/checkout", {
      pageTitle: "Checkout",
      prods: products,
      path: "/checkout",
    });
  });
};
