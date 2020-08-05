const router = require('express').Router();

const Users = require('./users-model');

/* ----- GET /api/users ---- */
router.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
