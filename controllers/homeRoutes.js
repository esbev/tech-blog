const router = require("express").Router();
const { Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {

  try {
    const postData = await Post.findAll({
      include: [{ model: Comment }]
    })
    const posts = postData.map((post) => post.get({plain:true}))

    res.render("home", {
      logged_in: req.session.logged_in,
      posts
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signUp", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

router.get("/dash", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("dashboard");
});

router.get("/logout", async (req, res) => {
  try {
    if (req.session.logged_in) {
      await req.session.destroy();
      res.redirect("/");
    } else {
      res.status(404).json({ message: "Session not found" });
    }
  } catch (err) {
    console.error("Error during logout:", err);
    res.status(500).json(err);
  }
  res.render("logout");
});

module.exports = router;
