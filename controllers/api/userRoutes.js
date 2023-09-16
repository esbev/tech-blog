const router = require("express").Router();
const withAuth = require('../../utils/auth')
const { User } = require("../../models");
//
router.post("/login", withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({ where : { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Failed to login" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Failed to login" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({user: userData});
    });
  } catch (err) {
    console.err(err);
    res.status(400).json(err);
  }
});

router.post("/signUp", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password
    });
    req.session.save(() => {
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    console.err(err);
    res.status(500).json(err);
  }
});


router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;


