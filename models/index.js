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

