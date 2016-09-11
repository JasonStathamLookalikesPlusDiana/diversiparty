const router                   = require('express').Router();
const { getAllUsers,
        getUser,
        createUser,
        updateUser,
        deleteUser,
        loginUser,
        logoutUser,
        findUserIDByUsername } = require('../models/user');

router.get('/new', (req,res) => {
  res.render('user/new');
});

router.post('/', createUser, (req,res) => {
  res.redirect('/');
});

// Post route for user to login
router.post('/login', loginUser, (req,res) => {
  if( res.error ) {
    res.redirect('/');
  } else {
    req.session.user = res.rows;
    res.redirect('/parties');
  }
});

router.get('/logout',logoutUser,(req,res) => {
  res.redirect('/');
});

module.exports = router;