const db     = require('../db/db');

function getAllParties(req,res,next){
  db.any(`SELECT * FROM parties INNER JOIN users on parties.host_id = users.user_id`)
    .then( data => {
      res.rows = data;
      next();
    })
    .catch( error => {
      console.log('Error ',error);
    });
}

function getParty(req,res,next){

  next();
}

function createParty(req,res,next){

  next();
}

function joinParty(req,res,next){

  next();
}

module.exports = { getAllParties,
                   getParty,
                   createParty,
                   joinParty};