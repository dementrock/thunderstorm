/** Santizier */
module.exports = function(app) {
  app.use(loadUser);
};

function setCurrentUser(req, res, next) {
  res.local('currentUser', req.currentuser);
  next();
}

/** Load current user if logged in
 *  else set current user to GUEST. */
function loadUser(req, res, next) {
  req.currentUser = User.GUEST;
  if (req.session.user_id) {
    loadUserFromSession(req, res, next);
  } else {
    loadUserFromCookie(req, res, next);
  }
}

/** Attempt to load current user from session.
 *  Redirect to /home if session.user_id points to an invalid user. */
function loadUserFromSession(req, res, next) {
  User.findById(req.session.user_id, function(err, user) {
    trace('loadUserFromSession');
    log(err);
    if (user) {
      req.currentUser = user;
      next();
    } else {
      log('WARNING: Session tampering attempt detected: ' + req.session);
      res.clearCookie('rememberme');
      req.flash('info', 'Please login.');
      res.redirect('/login');
    }
  });
}

/** Attempt to load current user from cookie.
 *  Redirect to /home if cookie points to an invalid user. */
function loadUserFromCookie(req, res, next) {
  var cookie = req.cookies['rememberme'] && JSON.parse(req.cookies['rememberme']);
  if (!cookie || !cookie.username || !cookie.series || !cookie.token) {
    next();
    return;
  }
  trace('loadUserFromCookie');

  LoginToken.findOne({
    username: cookie.username,
    series: cookie.series
  }, function(err, token) {
    if (err) {
      log(err);
      return;
    }

    if (token) {
      if (token.token != cookie.token) {
        log('WARNING: Cookie tampering attempt detected for user: ' + cookie.username);
        LoginToken.remove({
          username: cookie.username
        }, function() {
          res.clearCookie('rememberme');
          req.flash('info', 'Please login.');
          res.redirect('/login');
        });
      } else {
        User.findOne({
          username: cookie.username
        }, function(err, user) {
          log(err);
          if (user) {
            req.currentUser = user;
            req.session.user_id = user._id;
            token.save(function(err){
              log(err);
              res.cookie('rememberme', token.cookieValue, { maxAge: COOKIE_LIFETIME });
              req.currentUser = user;
              next();
            });
          } else {
            next();
          }
        });
      }
    } else {
      res.clearCookie('rememberme');
      next();
    }
  });
}