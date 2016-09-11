const router        = require('express').Router();
const { getAllParties,
        getParty,
        createParty,
        joinParty } = require('../models/party');

router.get('/',getAllParties,(req,res) => {
  console.log(res.rows);
  res.render('parties/index', {parties: res.rows})
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