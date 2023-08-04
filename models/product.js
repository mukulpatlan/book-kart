const fs = require("fs");
const path = require("path");
const pathutil = require("../utils/path");
const { deleteCart } = require("./cart");

const p = path.join(pathutil, "data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imgUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imgUrl;
    this.price = +price;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existProd = products.findIndex((p) => p.id === this.id);
        const updte = [...products];
        updte[existProd] = this;
        fs.writeFile(p, JSON.stringify(updte), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findByID(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }

  static delete(productId, cb) {
    getProductsFromFile((products) => {
      const existProd = products.findIndex((p) => p.id === productId);
      const updte = [...products];
      const deletedProd = updte.splice(existProd, 1)[0];
      console.log(deletedProd);
      fs.writeFile(p, JSON.stringify(updte), (err) => {
        if (!err) {
          deleteCart(productId, deletedProd.price);
          cb(updte);
        }
      });
    });
  }
};
