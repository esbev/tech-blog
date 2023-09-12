const router = require("express").Router();
const withAuth = require('../../utils/auth')
const { User } = require("../../models");

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


//try this
// router.post('/login', async (req,res) => {
//   let authUser = await db.authUser(req.body)
//   .catch((err) => {
//     return res.status(500).send("There was an error logging in.")
//   });
//   if ( authUser ) {  
//     console.log(authUser);
//     req.session.user_id=authUser.id;
//     req.session.author_name=authUser.author_name;
//     req.session.email=authUser.email;
//     req.session.loggedIn=true;
//     req.session.save(function(err) {
//       if (err) {
//         return res.status(500).send("There was an error logging in.")
//       }
//       else {
//         return res.status(200).redirect('/dashboard');
//       }
//     });
//   }
//   else {
//     return res.status(401).send("Incorrect email or password.");
//   }
// })

// router.post('/', async (req, res) => {
//   let authUser = await db.createUser(req.body)
//   .catch((err) => {
//     return res.status(500).send("There was an error creating the user.")
//   });;
//   if ( authUser ) {  
//     req.session.user_id=authUser.id;
//     req.session.author_name=authUser.author_name;
//     req.session.email=authUser.email;
//     req.session.loggedIn=true;
//     req.session.save(function(err) {
//       if (err) {
//         return res.status(500).send("There was an error logging in.")
//       }
//       else {
//         return res.status(200).redirect('/dashboard');
//       }
//     });
//   }
//   else {
//     return false;
//   }
// });


// router.get('/logout', (req,res) => {
//   req.session.destroy(function(err) {
//     if (err) {
//       return res.status(500).send("There was an error logging out.") 
//     }
//     else {
//       return res.status(200).redirect('/');
//     }
//   });
// });



// router.get('/', async (req, res) => {
//   let users = await db.getAllUsers(req.params.id);
//   if (users) {
//      return res.json(users)
//   }
//   else {
//     return res.status(404).send('User not found')
//   }
// });


// router.get('/:id', async (req, res) => {
//   let user = await db.getUser(req.params.id);
//   if (user) {
//     let user = user.get({ plain: true });
//     return res.json(user)
//   }
//   else {
//     return res.status(404).send('User not found')
//   }
// });



// router.put('/:id', async (req, res) => {
//   if (req.session.loggedIn) {
//   await db.updateUser(req.params.id, req.body)
//   await db.authUser(req.body)
//   .then((user) => {
//     return res.redirect('/');
//   })
//   .catch((err) => {
//     return res.status(500).send("There was an error editing this user")
//   });
//   } else {
//     return res.status(401);
//   };
// });