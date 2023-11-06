exports.get404Ctrl = (req, res, next) => {
  res
    .status(404)
    .render("404", {
      pageTitle: "Page not found",
      path: "*",
      isAuthenticated: req.session.isLoggedIn,
    });
};

exports.get500Ctrl = (req, res, next) => {
  console.log("get500Ctrl");
  res
    .status(500)
    .render("500", {
      pageTitle: "Error!",
      path: "/500",
      isAuthenticated: req.session.isLoggedIn,
    });
};
