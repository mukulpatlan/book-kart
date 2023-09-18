const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const rootdir = require("./utils/path");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const errorCtrl = require("./controllers/error");
const User = require("./models/user");
const { default: mongoose } = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const MONGODB_URI =
  "mongodb+srv://mukulviket:UvJn7eJ3cpuj2NMX@cluster0.4hgdz.mongodb.net/book_kart";
// const {mongoConnect} = require("./utils/database");

const app = express();
const store = new MongoDBStore({ uri: MONGODB_URI, collection: "sessions" });
// ejs
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootdir, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use((req, res, next) => {
  if(!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorCtrl.get404Ctrl);

mongoose
  .connect(MONGODB_URI)
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
