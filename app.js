const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const rootdir = require("./utils/path");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorCtrl = require("./controllers/error");
const User = require("./models/user");
const db = require("./utils/database");
const {mongoConnect} = require("./utils/database");

const app = express();

// ejs
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootdir, "public")));

app.use((req, res, next) => {
    User.findById("64fd904ee9e16831e0dfb7b2").then(user => {
        req.user = new User(user._id, user.userName, user.email, user.cart);
        next();
    }).catch(err => console.log(err));
})

// db.end()

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorCtrl.get404Ctrl);

mongoConnect(client => {
    app.listen(3000);
})
