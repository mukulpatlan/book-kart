const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const rootdir = require("./utils/path");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorCtrl = require("./controllers/error");
const User = require("./models/user");
const { default: mongoose } = require("mongoose");
// const {mongoConnect} = require("./utils/database");

const app = express();

// ejs
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootdir, "public")));

app.use((req, res, next) => {
  User.findById("64fe0c4918d5ba68e92b2e46")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorCtrl.get404Ctrl);

mongoose
  .connect(
    "mongodb+srv://mukulviket:MxhoKRKTjU81z3d2@cluster0.4hgdz.mongodb.net/book_kart?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected");
    User.findOne().then((user) => {
      if (!user) {
        const user = User({
          userName: "Mukul",
          email: "m@yopmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// mongoConnect(client => {
//     app.listen(3000);
// })
