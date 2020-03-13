const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = require('../secret');

function register(req, res) {
  const db = req.app.get('db');
  const { firstname, lastname, username, password } = req.body;

  argon2
    .hash(password)
    .then(hash => {
      return db.users.insert(
        {
          firstname,
          lastname,
          username,
          password: hash
        },
        {
          fields: ['id', 'firstname', 'lastname', 'username']
        }
      );
    })
    .then(user => {
      const token = jwt.sign({ userId: user.id }, secret);
      res.status(201).json({ ...user, token });
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function login(req, res) {
  const db = req.app.get('db');
  const { username, password } = req.body;
  console.log(username, password);

  db.users
    .findOne(
      { username },
      {
        fields: ['id', 'firstname', 'lastname', 'username', 'password']
      }
    )
    .then(user => {
      if (!user) {
        throw new Error('Invalid username');
      }
      return argon2.verify(user.password, password).then(valid => {
        if (!valid) {
          throw new Error('Incorrect password');
        }

        const token = jwt.sign({ userId: user.id }, secret);
        delete user.password;
        res.status(200).json({ ...user, token });
      });
    })
    .catch(err => {
      if (['Invalid username', 'Incorrect password'].includes(err.message)) {
        res.status(400).json({ error: err.message });
      } else {
        console.error(err);
        res.status(500).end();
      }
    });
}

function addContact(req, res) {
  const db = req.app.get('db');
  const {
    firstname,
    lastname,
    email,
    home_phone,
    mobile_phone,
    work_phone,
    city,
    country,
    state,
    postal_code,
    user_id
  } = req.body;

  db.contacts
    .insert({
      firstname,
      lastname,
      email,
      home_phone,
      mobile_phone,
      work_phone,
      city,
      country,
      state,
      postal_code
    })
    .then(function(contact) {
      const contact_id = contact.id;
      db.addressbook.insert({
        user_id,
        contact_id
      });
      res.status(201).json({ ...contact });
    })
    .catch(err => {
      console.error(err);
    });
}

function getContacts(req, res) {
  const db = req.app.get('db');
  const { user_id } = req.params;

  db.query(
    `SELECT * FROM contacts, addressbook WHERE addressbook.contact_id = contacts.id AND addressbook.user_id = ${user_id}`
  )
    .then(contacts => {
      res.status(201).json({ ...contacts });
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function getContactById(req, res) {
  const db = req.app.get('db');
  const { contact_id } = req.params;

  db.query(`SELECT * FROM contacts WHERE id = ${contact_id}`)
    .then(contacts => {
      res.status(201).json({ ...contacts });
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function editContact(req, res) {
  const db = req.app.get('db');
  const {
    firstname,
    lastname,
    email,
    home_phone,
    mobile_phone,
    work_phone,
    city,
    country,
    state,
    postal_code
  } = req.body;

  db.contacts
    .update(
      { id: req.params.contact_id },
      {
        firstname: firstname,
        lastname: lastname,
        email: email,
        home_phone: home_phone,
        mobile_phone: mobile_phone,
        work_phone: work_phone,
        city: city,
        country: country,
        state: state,
        postal_code: postal_code
      }
    )
    .then(contacts => res.status(200).json(contacts))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function deleteContact(req, res) {
  const db = req.app.get('db');
  const { contact_id } = req.params;

  db.query(`DELETE FROM addressbook WHERE contact_id = ${contact_id}`)
    .then(() => {
      db.query(`DELETE FROM contacts WHERE id=${contact_id}`);
    })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function addGroup(req, res) {
  const db = req.app.get('db');
  const { user_id, groupname } = req.body;

  db.groups
    .insert({
      user_id,
      groupname
    })
    .then(groups => {
      res.status(201).json({ ...groups });
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function getGroups(req, res) {
  const db = req.app.get('db');
  const { user_id } = req.params;

  db.query(
    `SELECT * FROM groups WHERE user_id=${user_id} ORDER BY groupname ASC`
  )
    .then(groups => {
      res.status(200).json([...groups]);
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function deleteGroup(req, res) {
  const db = req.app.get('db');
  const { group_id } = req.params;

  db.query(`DELETE FROM group_members`)
    .then(() => {
      db.query(`DELETE FROM groups WHERE id=${group_id}`);
    })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function addMembers(req, res) {
  const db = req.app.get('db');
  const groups = req.body;

  groups.map(group => {
    db.group_members.insert({
      contact_id: req.params.contact_id,
      group_id: group
    });
  });
  res.status(201).json('Added successfully!');
}

function getMembers(req, res) {
  const db = req.app.get('db');
  const { group_id } = req.params;

  db.query(
    `SELECT * FROM contacts, group_members WHERE contacts.id = group_members.contact_id AND group_members.group_id=${group_id} ORDER BY contacts.firstname ASC`
  )
    .then(members => {
      res.status(200).json([...members]);
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function deleteMember(req, res) {
  const db = req.app.get('db');
  const { group_id, contact_id } = req.params;

  db.query(
    `DELETE FROM group_members USING groups WHERE group_members.group_id=groups.id AND group_members.contact_id=${contact_id} AND group_members.group_id=${group_id}`
  )
    .then(members => {
      res.status(200).json([...members]);
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

module.exports = {
  register,
  login,
  addContact,
  getContacts,
  getContactById,
  editContact,
  deleteContact,
  addGroup,
  getGroups,
  deleteGroup,
  addMembers,
  getMembers,
  deleteMember
};
