module.exports = (req, res, next) => {
  console.log('user', req.session.user);
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(403).json({ message: 'not authorized' });
  }
};
