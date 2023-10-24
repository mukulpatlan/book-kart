const express = require("express");
const { check } = require("express-validator");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);
router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom(val, ({ req }) => {
        return User.findOne({ email: val }).then((user) => {
          if (!user) {
            return Promise.reject("Invalid Email or Password!");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password has to be atleast 5char long")
      .trim(),
  ],
  authController.postLogin
);
router.post("/logout", authController.postLogout);
router.get("/signup", authController.getSignup);
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom(val, ({ req }) => {
        return User.findOne({ email: val }).then((user) => {
          if (user) {
            return Promise.reject(
              "Email already exists. Please pick a different one."
            );
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password has to be atleast 5char long")
      .trim(),
    body("confirmPassword")
      .trim()
      .custom(val, ({ req }) => {
        if (val !== req.body.password) {
          throw new Error("Password is not a match!");
        }
        return true;
      }),
  ],
  authController.postSignup
);

module.exports = router;
