const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: {
      items: [
        {
          quantity: {
            type: Number,
            required: true,
          },
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
        },
      ],
      total: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex(
    (cp) => cp.productId.toString() === product._id.toString()
  );
  let newQuantity = 1;
  const newProductItems = [...this.cart.items];
  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    newProductItems[cartProductIndex].quantity = newQuantity;
  } else {
    newProductItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: newProductItems,
    total: (this.cart.total + product.price).toFixed(2),
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.postDeleteCartItem = function (product) {
  const udpatedCartItems = this.cart.items.find(
    (item) => item.productId.toString() !== product._id.toString()
  );
  const qty = this.cart.items.find(
    (i) => i.productId.toString() === product._id.toString()
  ).quantity;
  this.cart.total = (this.cart.total - product.price * qty).toFixed(2);
  this.cart.items = udpatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [], total: 0 };
  return this.save();
};

module.exports = model("Users", userSchema);

// const { ObjectId } = require("mongodb");
// const { getDb } = require("../utils/database");
// const Product = require("./product");

// class User {
//   constructor(id, userName, email, cart) {
//     this._id = id && new ObjectId(id);
//     this.userName = userName;
//     this.email = email;
//     this.cart = cart;
//   }

//   save() {
//     const db = getDb();
//     return db
//       .collection("users")
//       .insertOne(this)
//       .then(() => console.log("inserted"))
//       .catch((err) => console.log(err));
//   }

//   getCart() {
//     const productsIds = this.cart.items.map((d) => d.productId);
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: { $in: productsIds } })
//       .toArray()
//       .then((products) => {
//         return products.map((p) => ({
//           ...p,
//           quantity: this.cart.items.find(
//             (i) => i.productId.toString() === p._id.toString()
//           ).quantity,
//         }));
//       })
//       .catch((err) => console.log(err));
//   }

//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex(
//       (cp) => cp.productId.toString() === product._id.toString()
//     );
//     let newQuantity = 1;
//     const newProductItems = [...this.cart.items];
//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       newProductItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       newProductItems.push({
//         productId: new ObjectId(product._id),
//         quantity: newQuantity,
//       });
//     }
//     const updatedCart = { items: newProductItems };
//     const db = getDb();
//     return db
//       .collection("users")
//       .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
//   }

//   postDeleteCartItem(productId) {
//     const udpatedCartItems = this.cart.items.filter(
//       (item) => item.productId.toString() !== productId.toString()
//     );
//     const db = getDb();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: this._id },
//         { $set: { cart: { items: udpatedCartItems } } }
//       );
//   }

//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then((result) => {
//         const order = {
//           items: result,
//           user: {
//             _id: new ObjectId(this._id),
//             name: this.userName,
//           },
//         };
//         return db.collection("orders").insertOne(order);
//       })
//       .then((result) => {
//         this.cart = { items: [] };
//         return db
//           .collection("users")
//           .updateOne({ _id: this._id }, { $set: { cart: { items: [] } } });
//       });
//   }

//   getOrders() {
//     const db = getDb();
//     return db
//       .collection("orders")
//       .find({ "user._id": new ObjectId(this._id) })
//       .toArray();
//   }

//   static findById(userId) {
//     const db = getDb();
//     return db
//       .collection("users")
//       .findOne({ _id: new ObjectId(userId) })
//       .then((product) => {
//         console.log(product);
//         return product;
//       })
//       .catch((err) => console.log(err));
//   }
// }

// module.exports = User;
