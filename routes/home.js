const router = require('express').Router();

router.get('/', (req,res) => {
  console.log(req.session)
  if (req.session.user) {
    res.redirect('/parties');
  } else {
    res.render('index');
  }
})

module.exports = router;