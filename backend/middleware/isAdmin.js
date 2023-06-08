const isAdmin = (req, res, next) => {
    console.log('INSIDE isAdmin: req.user:', req.user); // Log the entire req.user object
    if (req.user.role === 'admin') {
        next();
    } else {
      res.status(403).json({ error: 'Access denied. Requires admin role.' });
    }
  };

module.exports = isAdmin;