const router        = require('express').Router();
const { getAllParties,
        getParty,
        createParty,
        joinParty } = require('../models/party');

router.get('/',getAllParties,(req,res) => {
  res.render('parties/index', {parties: res.rows})
})

router.get('/new',(req,res) => {
  res.render('parties/new')
})

router.get('/:id',getParty,(req,res) => {
  res.render('parties/show',{party: res.row, user: req.session, joined: req.session.party[req.params.id], filter: res.party_filter})
})

router.post('/',createParty,(req,res) => {
  res.redirect('/parties')
})

router.post('/:id',joinParty,(req,res) => {
  req.session.party[req.params.id] = true;
  res.redirect(`/parties/${req.params.id}`)
})


module.exports = router;