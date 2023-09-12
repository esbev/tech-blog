const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

User.hasMany(Post);

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Comment);

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment);

Comment.hasOne(Post);

module.exports = { User, Post, Comment };

// try this
// const User = require('./User');
// const Comment = require('./Comment');
// const BlogPost = require('./BlogPost');


// User.hasMany(BlogPost);
// User.hasMany(Comment);
// BlogPost.belongsTo(User, {
//   foreignKey: 'user_id',
// });
// BlogPost.hasMany(Comment);
// Comment.belongsTo(User, {
//   foreignKey: 'user_id',
// });
// Comment.hasOne(BlogPost);


// module.exports = {
//   User,
//   Comment,
//   BlogPost
// };

// const db = {

//   createComment: async (comment) => {
//     return await Comment.create(comment)
//     .catch((err) => {
//       console.log(err)
//       return err
//     })
//   },

//   //api only
//   getAllComments: async () => {
//     return await Comment.findAll({
//       include: [{ 
//         model: User,
//         attributes: ["id", "author_name"],
//         as: "user",
//        }],
//       order: [["comment_time", "DESC"]]
//     })
//     .catch((err) => {
//       return err
//     });
//   },

//   getComment: async (id) => {
//     return await Comment.findByPk(id, {
//       include: [
//         { model: User, 
//           attributes: ["id", "author_name"], 
//           as: "user" },
//       ]
//     })
//     .catch((err) => {
//       return err
//     });
//   },

//   deleteComment: async (sessionUserId, commentID) => {
//     return await Comment.destroy({ 
//       where: { 
//         id: commentID, 
//         user_id: sessionUserId 
//       } 
//     })
//     .then((comment) => {
//       return true
//     })
//     .catch((err) => {
//       return err 
//     });
    
//   },

//   createUser: async (user) => {
//     console.log(user)
//     return await User.create(user)
//     .catch((err) => {
//       console.log(err)
//       return err
//     })
//   },
    
//   //api only
//   getAllUsers: async () => {
//     return await User.scope('withoutPassword').findAll({
//       include: [{ model: BlogPost }, { model: Comment }],
//     })
//     .catch((err) => {
//       return err
//     });
//   },

//   getUser: async (id) => {
//     return await User.scope('withoutPassword').findByPk(id, {
//       include: [{ model: BlogPost }, { model: Comment }],
//     })
//     .catch((err) => {
//       return err
//     });
//   },

//   updateUser: async (sessionUserId, userId, info) => {
//     return await User.update(info, { 
//       where: { 
//         id: userId && sessionUserId 
//       }, 
//         individualHooks: true 
//       })
//     .catch((err) => {
//       return false 
//     });
//   },
  
//   createBlogPost: async (sessionUserId, blogPost) => {
//     blogPost.user_id = sessionUserId
//     console.log(blogPost)
//     return await BlogPost.create(blogPost)
//     .catch((err) => {
//       console.log(err)
//       return err
//     })
    
//   },

//   getBlogPosts: async (id=null) => {
//     return await BlogPost.findAll({
//       where: id ? { user_id: id } : {},
//       include: [
//         { model: User, 
//           attributes: ["id", "author_name"], 
//           as: "user" },
//         {
//           model: Comment,
//           include: {
//             model: User,
//             attributes: ["id", "author_name"],
//             as: "user",
//           },
//         },
//       ],
//       order: [["post_time", "DESC"]]
//     })
//     .then((blogs) => {
//       return blogs.map((blog) => {
//         return blog.get({plain: true})
//       })
//     })
//     .catch((err) => {
//       return err
//     });
//   },

//   getBlogPost: async (id) => {
//     return await BlogPost.findByPk(id, {
//       include: [
//         { model: User, attributes: ["id", "author_name"], as: "user" },
//         {
//           model: Comment,
//           include: [{ 
//             model: User, 
//             attributes: ["id", "author_name"], 
//             as: "user" 
//             },
//           ]
//         },
//       ],
//     })
//     .catch((err) => {
//       return err
//     });
//   },

//   updateBlogPost: async (sessionUserId, blogPostID, blogPost) => {
//     console.log(sessionUserId, blogPost)
//     return await BlogPost.update(blogPost, { 
//       where: { 
//         id: blogPostID, 
//         user_id: sessionUserId 
//       } 
//     })
//     .catch((err) => {
//       return err 
//     });
//   },

//   deleteBlogPost: async (sessionUserId, blogpostId) => {
//     console.log(sessionUserId, blogpostId)
//     return await BlogPost.destroy({ 
//       where: { 
//         id: blogpostId, 
//         user_id: sessionUserId 
//       } 
//     })
//     .then((blog) => {
//       return true
//     })
//     .catch((err) => {
//       return err 
//     });
//   },









//   //authenticate util
//   authUser: async (user) => {
//     console.log(user)
//     let password = user.password;
//     let authUser = await User.findOne({
//       where: { email: user.email }
//     })
//     if (authUser) {
//     return authUser.authenticate(password) ? authUser.toJSON() : false;
//     } else {
//       return false;
//     }
//   },
// }

// module.exports = { db, User, Comment, BlogPost };
