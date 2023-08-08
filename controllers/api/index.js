const router = require('express').Router();
const blogsRoutes = require('./blogsRoutes');
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
router.use('/projects', blogsRoutes);

module.exports = router;
