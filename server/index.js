const express = require('express');
const massive = require('massive');
const cors = require('cors');

const user = require('./controllers/user.js');

massive({
  host: 'localhost',
  port: 5432,
  database: 'abook',
  user: 'postgres',
  password: 'abook'
})
  .then(db => {
    const app = express();
    app.set('db', db);
    app.use(express.json());
    app.use(cors());

    //Endpoints
    app.post('/api/register', user.register);
    app.post('/api/login', user.login);

    app.post('/api/addContact', user.addContact);
    app.get('/api/getContacts/:user_id', user.getContacts);
    app.get('/api/getContactById/:contact_id', user.getContactById);
    app.put('/api/editContact/:contact_id', user.editContact);
    app.delete('/api/deleteContact/:contact_id', user.deleteContact);

    app.post('/api/addGroup/:user_id', user.addGroup);
    app.get('/api/getGroups/:user_id', user.getGroups);
    app.delete('/api/deleteGroup/:group_id', user.deleteGroup);
    app.post('/api/addMembers/:contact_id', user.addMembers);
    app.get('/api/getMembers/:group_id', user.getMembers);
    app.delete('/api/deleteMember/:contact_id/:group_id', user.deleteMember);

    const port = 3008;
    app.listen(port, () => {
      console.log(`Server listening on this port: ${port}`);
    });
  })
  .catch(console.error);
