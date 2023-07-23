const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");

const app = express();

// handlebars
app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: ".hbs",
  })
);

const rootdir = require("./utils/path");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootdir, "public")));

// handlebars
app.set("view engine", "hbs");

// pug
// app.set("view engine", "pug");

app.set("views", "views");

app.use("/admin", adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page not found" });
});

app.listen(3000);
