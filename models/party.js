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
      "College Brochure": {
        "Non-threatening Black Guys": 4,
        "White Women": "No Limit",
        "Asian Women": 4,
        "Hispanic Guys": 4
      },
      "Actual College Party": {
        "Asian Guys": 4,
        "Black Guys": 1,
        "White Women": "No Limit",        
        "White Guys": "No Limit"
      },
      "Eastern-European Biker Bar": {
        "Shaved Head White Guys": 40,
        "Overweight People": 10
      },
      "DnD Basement": {
        "White Guy": "No Limit",
        "Asian Guys with disapproving parents": 2
      },
      "Quincenera": {
        "Awkward Teenagers": "No Limit",
        "Uncles with Guayabera Shirts": "No Limit"
      },
      "Werewolf Bar Mitzvah": {
        "Anything Goes": "No Limit"
      },
      "Holiday Office Party": {
        "Employees": "No Limit",
        "Hot Colleagues": 2
      },
      "Resort Luau": {
        "Tourists": 20,
        "Unhappy Families": 60
      },
      "Noon Tea Party": {
        "Young Girls": 1,
        "Stuffed Animals": "No Limit"
      },
      "TechCrunch Disrupt": {
        "White Guys": 80,
        "Women": "No Limit",
        "Citizens of the World": "No Limit"
      }
    }
    return parties[party_type]
  }

  db.one(`SELECT * FROM parties INNER JOIN users on parties.host_id = users.user_id WHERE party_id=$1`,[req.params.id])
    .then( data => {
      res.party_filter = translateParty("TechCrunch Disrupt");
      res.row = data;
      next();
    })
    .catch( error => {
      console.log('Error ',error);
    });
}

function createParty(req,res,next){
  console.log(req.body);
  db.none(`INSERT INTO parties
           (name,location,category,party_date,party_time,host_id)
           values ($1,$2,$3,$4,$5,$6)`,
           [
            req.body.name,
            req.body.location,
            req.body.partyType,
            req.body.date,
            req.body.time,
            req.session.userID
          ])
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
                   joinParty };
