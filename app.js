const express = require("express");

const path = require("path");

const bodyParser = require("body-parser");

const app = express();

const rootdir = require("./utils/path");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootdir, "public")));

app.set("view engine", "pug");
app.set("views", "views");

app.use("/admin", adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page not found" });
});

app.listen(3000);
