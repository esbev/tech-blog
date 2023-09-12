const router = require('express').Router();
const { Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.id },
      include: [{ model: Comment}],
    });

    const posts = postData.map((aPost) => aPost.get({ plain: true }));

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
      const postData = await Post.create(req.session.user_id, req.body)
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
      const updatedPost = await Post.update(req.session.user_id, req.params.id, req.body)
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
      const deletePost = await Post.update(req.session.user_id, req.params.id)
      return res.status(200).json("deleted");
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
});
// try this
// router.get('/', async (req, res) => {
//   let blogposts = await db.getBlogPosts();
//   if (blogposts) {
//     let blogposts = blogposts.map((blogpost) => blogpost.get({ plain: true }));
//     return res.status(200).json(blogposts)
//   }
//   else {
//     return res.status(404).send('No blog posts found')
//   }
// });

// router.post('/', async (req, res) => {
//   if (req.session.loggedIn) {  
//   await db.createBlogPost(req.session.user_id, req.body)
//     .then((blogpost) => {
//       return res.status(200).json(blogpost);
//     })
//     .catch((err) => {
//       console.log(err);
//       return res.status(500).json(err);
//     });
//   } else {
//     return res.status(401)
//   }
// });

// router.put('/:id', async (req, res) => {
//   if (req.session.loggedIn) {
//     console.log(req.body)
//   await db.updateBlogPost(req.session.user_id, req.params.id, req.body)
//   .then((blogpost) => {
//       return res.status(200).json(blogpost);
//     })
//   .catch((err) => {
//       return res.status(500).json(err);
//     });
//   } else {
//     return res.status(401)
//   }
// });

// router.delete('/:id', async (req, res) => {
//   if (req.session.loggedIn) {
//   await db.deleteBlogPost(req.session.user_id, req.params.id)
//   .then((blogpost) => {
//     return res.status(200).send("Successfuly deleted blog post")
//   })
//   .catch((err) => {
//     console.log(err)
//     return res.status(500).json(err);
//   })
//   } else {
//     return res.status(401)
//   }
// });