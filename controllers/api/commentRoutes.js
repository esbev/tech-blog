const router = require('express').Router();
const { Post, Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create(req.body);
        return res.status(200).json(commentData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    if (req.session.logged_in) {
      try {
        const deleteComment = await Comment.destroy({
          where: {id: Comment.id}
        })
        return res.status(200).json("deleted");
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
    }
  });