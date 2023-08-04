const fs = require("fs");
const path = require("path");
const pathutil = require("../utils/path");

const p = path.join(pathutil, "data", "cart.json");

module.exports = class Cart {
  static add(productId, price) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const productIdx = cart.products.findIndex((p) => p.id === productId);
      const product = cart.products[productIdx];
      let updatedProduct;
      if (product) {
        updatedProduct = { ...product };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[productIdx] = updatedProduct;
      } else {
        updatedProduct = { qty: 1, id: productId };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +price;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteCart(productId, price) {
    fs.readFile(p, (err, fileContent) => {
      if (err) return;
      const cart = { ...JSON.parse(fileContent) };
      const product = cart.products.find((p) => p.id === productId);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      cart.products = cart.products.filter((p) => p.id !== productId);
      cart.totalPrice = cart.totalPrice - price * productQty;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (!err) {
        const cart = JSON.parse(fileContent);
        cb(cart);
      } else {
        cb(null);
      }
    });
  }
};
