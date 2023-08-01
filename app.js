const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
// const { engine } = require("express-handlebars");

const app = express();

// app.engine(
//   "hbs",
//   engine({
//     layoutsDir: "views/layouts",
//     defaultLayout: "main-layout",
//     extname: ".hbs",
//   })
// );

const rootdir = require("./utils/path");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorCtrl = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootdir, "public")));

// ejs
app.set("view engine", "ejs");

// handlebars
// app.set("view engine", "hbs");

// pug
// app.set("view engine", "pug");

app.set("views", "views");

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorCtrl.get404Ctrl);

app.listen(3000);
