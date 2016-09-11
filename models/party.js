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
  function translateParty(party_type){
    let parties = {
      "College Brochure": "8-guys 8-girls",
      "Actual College Party": "",
      "Eastern-European Biker Bar": "",
      "DnD Basement": "",
      "Quincenera": "",
      "Werewolf Bar Mitzvah": "",
      "Holiday Office Party": "",
      "Resort Luau": "",
      "Noon Tea Party": "",
      "TechCrunch Disrupt": ""
    }
    return parties[party_type]
  }
  db.one(`SELECT * FROM parties INNER JOIN users on parties.host_id = users.user_id WHERE party_id=$1`,[req.params.id])
    .then( data => {
      res.party_filter = translateParty("College Brochure");
      res.row = data;
      next();
    })
    .catch( error => {
      console.log('Error ',error);
    });
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