const router = require('express').Router();

const dashRoutes = require('./dashRoutes');
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
router.use('/dash', dashRoutes);


module.exports = router;
