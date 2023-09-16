const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      // where: { user_id: req.session.id },
      include: [{ 
        model: Comment, 
        model: User}],
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

router.post('/', async (req, res) => {
  if (req.session.logged_in) {
    try {
      const postData = await Post.create({
        user_id: req.session.user_id,
        author: req.username,
        description: req.body,
      })
      return res.status(200).json(postData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
});

router.put('/:id', async (req, res) => {
  if (req.session.logged_in) {
    try {
      const updatedPost = await Post.update({
        where: {
          id: req.params.id,
          description: req.body,
        }
      })
      return res.status(200).json(updatedPost);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
});

router.delete('/:id', async (req, res) => {
  if (req.session.logged_in) {
    try {
      const deletePost = await Post.destroy({
        where: {id: Post.id}
      })
      return res.status(200).json("deleted");
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
});
