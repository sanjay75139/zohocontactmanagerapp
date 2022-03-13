const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/usermodel");

//Get routes
router.get("/", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success_msg", "You have been logged out.");
  req.session.destroy((err)=>{
    console.log(err)
    res.redirect('/')
    // console.log(req.session.isLoggedIn)
})
});

//POST routes
router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/",
    failureFlash: "Invalid email or password. Try Again!!!",
  }),
  (req,res)=>{
    req.session.userId = req.user;
    console.log(req.session.userId)
    req.session.save(err=>{
      console.log(err)
      res.redirect("/home")
  });
  },
);

router.post("/signup", (req, res) => {
  let { name, email, password } = req.body;

  let userData = {
    name: name,
    email: email,
  };

  User.register(userData, password, (err, user) => {
    if (err) {
      req.flash("error_msg", "ERROR: " + err);
      req.flash("success_msg", "already a user please login");
      res.redirect("/signup");
    }
    passport.authenticate("local")(req, res, () => {
      req.flash("success_msg", "Account created successfully");
      res.redirect("/");
    });
  });
});

module.exports = router;
