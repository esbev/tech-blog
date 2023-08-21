const router = require('express').Router();
const { Post, Comment } = require('../../models');

//get all posts for home
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: Comment }],
    });

    if (!postData) {
      return res.status(404).json({ message: "Post not found."});
    };
  
    return res.status(200).json(postData);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
});

//get all posts for home
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: Comment }],
      where: {
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      return res.status(404).json({ message: "Post not found."});
    };
  
    return res.status(200).json(postData);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
});

//create new post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.update({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
