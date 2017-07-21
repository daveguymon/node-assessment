const express = require('express');
const bodyParser = require('body-parser');
const usersCtrl = require('./usersCtrl');

const app = express();
app.use(bodyParser.json())
const port = 3000;

//STEP 1
app.get('/api/users', usersCtrl.getUsers);

//STEP 2
app.get('/api/users/:id', usersCtrl.getUserId);

//STEP 3
app.get('/api/admins', usersCtrl.getUserAdmin);

//STEP 4
app.get('/api/nonadmins', usersCtrl.getNonAdmins);

//STEP 5
app.get('/api/user_type/:userType', usersCtrl.getUsersByType);

//STEP 6
app.put('/api/users/:userId', usersCtrl.updateById);

//STEP 7
app.post('/api/users', usersCtrl.addUsers);

//STEP 8
app.delete('/api/users/:userId', usersCtrl.deleteById);


app.listen(port, ()=>console.log(`Listening on port: ${port}`))
