module.exports = function(app) {
  app.get('/game', function(req, res) {
    res.render('game', {
      page: 'game'
    });
  });
  app.get('/game/:shipType', function(req, res) {
    res.render('game', {
      page: 'game'
    });
  });
};
