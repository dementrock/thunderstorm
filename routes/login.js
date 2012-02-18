module.exports = function(app) {
  app.get('/login', function(req, res) {
    res.render('login', {
      page: 'login',
    });
  });
  app.post('/login', function(req, res) {
    sanitize('user', 'username');
    sanitize('user', 'password');
    res.redirect('/default');
  });
};
