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
  db.none(`INSERT INTO parties
           (name,location,party_date,party_time,host_id)
           values ($1,$2,$3,$4,$5)`,
           [])
    .then(data => {
      console.log('Successfully created party!');
      next();
    })
    .catch( err => console.log('Error: ',err));
}

function joinParty(req,res,next){

  next();
}

module.exports = { getAllParties,
                   getParty,
                   createParty,
                   joinParty};