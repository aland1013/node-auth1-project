const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('./users-model');
const restricted = require('./restricted-middleware');

/* ----- GET /api/users ---- */
router.get('/users', restricted, (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.send(err));
});

/* ----- POST /api/register ----- */
router.post('/register', (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* ----- POST /api/login ----- */
router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.cookie.userId = user.id;
        res.status(200).json({ message: 'Logged in' });
      } else {
        res.status(401).json({ message: 'You shall not pass!' });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
