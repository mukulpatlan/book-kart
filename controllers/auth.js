const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.getLogin = (req, res, next) => {
  let message = req.flash("errorMessage");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
    oldInput: { email: "", password: "" },
    errors: [],
  });
};

exports.postLogin = (req, res, next) => {
  const { password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
      },
      errors: errors.array(),
    });
  }
  bcrypt
    .compare(password, user.password)
    .then((doMatch) => {
      if (doMatch) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save((err) => {
          console.log(err);
          res.redirect("/");
        });
      } else {
        req.flash("errorMessage", "Invalid Email or Password!");
        res.redirect("/login");
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/login");
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("errorMessage");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
    oldInput: { email: "", password: "", confirmPassword: "" },
    errors: [],
  });
};

exports.postSignup = (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/signup", {
      path: "/signup",
      pageTitle: "Signup",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: req.body.confirmPassword,
      },
      errors: errors.array(),
    });
  }
  return bcrypt
    .hash(password, 12)
    .then((hashedPass) => {
      const userObj = new User({
        email: email,
        password: hashedPass,
        cart: { items: [], total: 0 },
      });
      return userObj.save();
    })
    .then((u) => {
      return res.redirect("/login");
    })
    .catch((err) => {
      console.log(err);
    });
};
