const router        = require('express').Router();
const { getAllParties,
        getParty,
        createParty,
        joinParty } = require('../models/party');

router.get('/',(req,res) => {
  res.render('parties/index')
})

router.get('/:id',getParty,(req,res) => {
  res.render('parties/show')
})

router.get('/new',(req,res) => {
  res.render('parties/new')
})

router.post('/',createParty,(req,res) => {
  res.redirect('/parties')
})

router.post('/:id',joinParty,(req,res) => {
  res.redirect('/parties')
})


module.exports = router;