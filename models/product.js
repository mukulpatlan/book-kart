const fs = require("fs");
const path = require("path");
const mongoDb = require("mongodb");
const pathutil = require("../utils/path");
// const { deleteCart } = require("./cart");
const { getDb } = require("../utils/database");

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
  constructor(id, title, imgUrl, price, description, userId) {
    this._id = id && new mongoDb.ObjectId(id);
    this.title = title;
    this.imageUrl = imgUrl;
    this.price = +price;
    this.description = description;
    this._userId = userId && new mongoDb.ObjectId(userId);
  }

  save() {
    const db = getDb();
    let op;
    console.log(this._id);
    if(this._id) {
      op = db.collection("products")
      .updateOne({_id: this._id}, {$set: this})
    } else {
      op = db.collection("products")
      .insertOne(this)
    }
    return op
      .then((res) => console.log("inserted success"))
      .catch((err) => console.log(err));
    // getProductsFromFile((products) => {
    //   if (this.id) {
    //     const existProd = products.findIndex((p) => p.id === this.id);
    //     const updte = [...products];
    //     updte[existProd] = this;
    //     fs.writeFile(p, JSON.stringify(updte), (err) => {
    //       console.log(err);
    //     });
    //   } else {
    //     this.id = Math.random().toString();
    //     products.push(this);
    //     fs.writeFile(p, JSON.stringify(products), (err) => {
    //       console.log(err);
    //     });
    //   }
    // });
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products').find({}).toArray().then(products => {
      // console.log(products);
      return products;
    }).catch(err => console.log(err));
    // getProductsFromFile(cb);
  }

  static findByID(id) {
    const db = getDb();
    return db.collection('products').find({_id: new mongoDb.ObjectId(id)}).next().then(product => {
      console.log(product);
      return product;
    }).catch(err => console.log(err));
    // getProductsFromFile((products) => {
    //   const product = products.find((p) => p.id === id);
    //   cb(product);
    // });
  }

  static delete(productId) {
    const db = getDb();
    return db.collection('products').deleteOne({_id: new mongoDb.ObjectId(productId)}).then(product => {
      console.log("deleted");
    }).catch(err => console.log(err));
    // getProductsFromFile((products) => {
    //   const existProd = products.findIndex((p) => p.id === productId);
    //   const updte = [...products];
    //   const deletedProd = updte.splice(existProd, 1)[0];
    //   console.log(deletedProd);
    //   fs.writeFile(p, JSON.stringify(updte), (err) => {
    //     if (!err) {
    //       deleteCart(productId, deletedProd.price);
    //       cb(updte);
    //     }
    //   });
    // });
  }
};
