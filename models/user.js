const db     = require('../db/db');
const bcrypt = require('bcrypt');
const salt   = bcrypt.genSalt(10);

function getAllUsers(req,res,next) {
  db.any(`SELECT * FROM users`)
    .then( data => {
      res.rows = data;
      next();
    })
    .catch( error => {
      console.log('Error ',error);
    });
}

function getUser(req,res,next) {
  console.log(req.params.id);
  console.log(typeof req.params.id);
  db.one(`SELECT *
          FROM users
          WHERE user_id=$1`,[req.params.id])
    .then(data => {
      res.userInfo = data;
      next();
    })
    .catch( error => {
      console.log('Error ', error);
    })
}

function findUserIDByUsername(req,res,next) {
  if(req.session.user) {
    console.log('In findUserIDByUsername, req.session.user: ', req.session.user);
    db.one(`SELECT user_id
            FROM users
            WHERE username=$1`,
            [req.session.user])
      .then( data => {
        console.log(39,data);
        req.session.userID = data.user_id;
        req.session.party = {};
        next();
      })
      .catch( error => {
        console.log('Error ',error);
      });
  } else {
    next();
  }
}

function createSecure(email, password, callBack) {
  bcrypt.genSalt( (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      callBack(hash);
    });
  });
}

function createUser(req,res,next) {
  createSecure(req.body.email, req.body.pass, saveUser);
  function saveUser(hash) {
    db.any(`INSERT INTO users 
            (username, password_digest, image_url, description )
            VALUES ($1, $2, $3, $4);`,
           [req.body.user,
            hash,
            req.body.image,
            req.body.description])
      .then( data => {
        console.log('Successfully added new entry');
        req.session.name = req.body.user;
        req.session.image = req.body.image;
        req.session.description = req.body.description;
        next();
      })
      .catch( error => {
        console.log('Error ', error);
      });
  }
}

// User login middleware
// Error is purposefully the same whether it's the password or the 
// email that is incorrect
function loginUser(req,res,next) {
  let user    = req.body.user;
  let password = req.body.pass;
  db.one(`SELECT *
          FROM users
          WHERE username=$1;`,[user])
    .then( data => {
      // checking if password is correct for user
      if(bcrypt.compareSync(password, data.password_digest)) {
        res.rows = data.username;
      } else {
        res.error = 'Incorrect login';
      }
      next();
    })
    .catch( error => {
      console.log('Error ',error);
      res.error = 'Incorrect login';
      next(); // don't want your site to freeze up if the login isn't correct
    });
}

function logoutUser(req,res,next) {
  delete req.session.name;
  req.session.party = {};
  next();
}

function updateUser(req,res,next) {
  let queryString = '';
  if(req.body.first_name !== '') queryString += 'first_name = $1';
  if(req.body.last_name !== ''){
    if(queryString !== '') queryString += ','
    queryString += 'last_name=$2';
  }
  if(req.body.age !== '') {
    if(queryString !== '') queryString += ','
    queryString += 'age=$3';
  }
  db.any(`UPDATE users SET
          ${queryString}
          WHERE user_id=$4;`,
          [req.body.first_name,req.body.last_name,req.body.age,req.params.id])
    .then( data => {
      console.log('Update successful!');
      next();
    })
    .catch( error => {
      console.log('Error ',error);
    });
}

function deleteUser(req,res,next) {
  db.any(`DELETE FROM users
          WHERE user_id=$1;`, [req.params.id])
    .then( data => {
      console.log('Successfully deleted user');
      next();
    })
    .catch( error => {
      console.log('Error ', error);
    });
}

module.exports = { getAllUsers,
                   getUser,
                   createUser,
                   updateUser,
                   deleteUser,
                   loginUser,
                   logoutUser,
                   findUserIDByUsername };