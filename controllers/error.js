exports.get404Ctrl = (req, res, next) => {
  res
    .status(404)
    .render("404", {
      pageTitle: "Page not found",
      path: "*",
      isAuthenticated: req.session.isLoggedIn,
    });
};
