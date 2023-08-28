const router = require('express').Router();
const { Post, Commemt } = require('../../models');

router.get("/dash", async (req, res) => {
    if (!req.session.logged_in) {
      res.redirect("/");
      return;
    }
    
    try {
      const postData = await Post.findAll({
        include: [{ model: Comment}],
        where: { user_id: req.session.id },
      });
  
      const posts = postData.map((post) => post.get({ plain: true }));
  
      res.render("dashboard", {
        logged_in: req.session.logged_in,
        posts,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

  module.exports = router;