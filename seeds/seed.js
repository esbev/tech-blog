const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const commentData = require('./commentData.json');
const postData = require('./postData.json');
const userData = require('./userData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const user = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await post.create({
      ...post,
      user_id: user.id,
    });
  }

  for (const comment of commentData) {
    await comment.create({
      ...comment,
      post_id: post.id,
      user_id: user.id,
    });
  }

  process.exit(0);
};

seedDatabase();
