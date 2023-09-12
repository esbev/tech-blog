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
// try this
// router.post('/', async (req, res) => {
//     if (req.session.loggedIn) {
//       req.body.user_id = req.session.user_id;
//       return await db.createComment(req.body)
//     .then((comment) => {
//       return res.status(200).json(comment);
//     })
//     .catch((err) => {
//       console.log(err)
//       return res.status(500)
//     })
//     } else {
//       return res.status(401)
//     }
//   });
  
//   router.delete('/:id', async (req, res) => {
//     if (req.session.loggedIn) {
//       await db.deleteComment(req.session.user_id, req.params.id)
//       .then((comment) => {
//         console.log(comment)
//         return res.status(200).send("Successfuly deleted comment")
//       })
//       .catch((err) => {
//         console.log(err)
//         return res.status(500)
//       })
//     } else {
//       return res.status(401)
//     }
//   });
  