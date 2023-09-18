const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  }
})

module.exports = model('Product', productSchema);
// const mongoDb = require("mongodb");
// const { getDb } = require("../utils/database");

// module.exports = class Product {
//   constructor(id, title, imgUrl, price, description, userId) {
//     this._id = id && new mongoDb.ObjectId(id);
//     this.title = title;
//     this.imageUrl = imgUrl;
//     this.price = +price;
//     this.description = description;
//     this._userId = userId && new mongoDb.ObjectId(userId);
//   }

//   save() {
//     const db = getDb();
//     let op;
//     console.log(this._id);
//     if(this._id) {
//       op = db.collection("products")
//       .updateOne({_id: this._id}, {$set: this})
//     } else {
//       op = db.collection("products")
//       .insertOne(this)
//     }
//     return op
//       .then((res) => console.log("inserted success"))
//       .catch((err) => console.log(err));
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db.collection('products').find({}).toArray().then(products => {
//       return products;
//     }).catch(err => console.log(err));
//   }

//   static findByID(id) {
//     const db = getDb();
//     return db.collection('products').find({_id: new mongoDb.ObjectId(id)}).next().then(product => {
//       console.log(product);
//       return product;
//     }).catch(err => console.log(err));
//   }

//   static delete(productId) {
//     const db = getDb();
//     return db.collection('products').deleteOne({_id: new mongoDb.ObjectId(productId)}).then(product => {
//       console.log("deleted");
//     }).catch(err => console.log(err));
//   }
// };
