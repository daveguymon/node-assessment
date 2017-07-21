const userData = require('./userData.json');

module.exports = {
//STEPS 1 & 2
getUsers: (req, res) => {
  if(req.query.age) {
    var byAge = userData.filter((u) => u.age < req.query.age);
    res.status(200).json(byAge);
  } else if(req.query.lastname) {
    var byLName = userData.filter((u) => u.last_name == req.query.lastname);
    res.status(200).json(byLName)
  } else if(req.query.email){
    var byEmail = userData.filter((u) => u.email === req.query.email);
    res.status(200).json(byEmail);
  } else if(req.query.favorites) {
    var user = userData.filter((u) => u.favorites.includes(req.query.favorites));
    res.status(200).json(user);
  } else {
    res.status(200).json(userData);
  }
},

getUserId: (req, res) => {
  var byId = userData.filter((u) => u.id == req.params.id);
  if(byId[0]) {
    res.status(200).json(byId[0]);
  }
  else {
    res.status(404).json(null);
  }
},

//STEP 3
getUserAdmin: (req, res) => {
  var admin = userData.filter((u) => u.type === 'admin');
  res.status(200).json(admin);
},

//STEP 4
getNonAdmins : (req, res) => {
  var nonAdmin = userData.filter((u) => u.type !== 'admin');
  res.status(200).json(nonAdmin);
},

//STEP 5
getUsersByType: (req, res) => {
  var user = userData.filter((u) => u.type === 'user');
  var moderator = userData.filter((u) => u.type === 'moderator');
  var admin = userData.filter((u) => u.type === 'admin');

  if(req.params.userType === 'user') {
    res.status(200).json(user);
  } else if (req.params.userType === 'moderator') {
    res.status(200).json(moderator);
  } else if (req.params.userType === 'admin') {
    res.status(200).json(admin);
  }
},

//STEP 6
updateById: (req, res) => {
  var updateId = req.params.userId
  console.log(updateId)

  let index = userData.findIndex((u) => updateId == u.id);
  console.log(index);
  userData[index] = {
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
    language: req.body.language,
    age: req.body.age,
    city: req.body.city,
    state: req.body.state,
    type: req.body.type,
    favorites: req.body.favorites
  }

  res.status(200).json(userData);
},

addUsers: (req, res) => {
  let id = userData[userData.length-1].id + 1;
  var newUser = {
    id: id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
    language: req.body.language,
    age: req.body.age,
    city: req.body.city,
    state: req.body.state,
    type: req.body.type,
    favorites: req.body.favorites
  };
  userData.push(newUser);
  res.status(200).json(userData);
},

deleteById: (req, res) => {
  var updateId = req.params.userId;
  console.log(updateId)
  let index = userData.findIndex((u) => updateId == u.id);
  userData.splice(index, 1);
  res.status(200).json(userData);
}

}
