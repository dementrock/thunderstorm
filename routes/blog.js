module.exports = function(app) {
  app.param('blogId', function(req, res, next, blogId) {
    trace('param userId');
    Blog.findById(blogId).populate('user').run(function(err, blog) {
      log(err);
      res.local('blog', !err && user);
      next();
    });
  });
  app.get('/blog', function(req, res) {
    var blog = new Blog({
      title: "This is a test blog",
      date: new Date(),
      body: "This is the blog body."
    });
    res.render('blog', {
      page: 'blog',
      blog: blog
    });
  });
  app.get('/blog/:blogId', function(req, res) {
    res.render('blog', {
      page: 'blog',
    });
  });
  app.put('/admin/blog', function(req, res) {
    sanitize('blog', 'title');
    sanitize('blog', 'body', 'css');
    res.redirect('/default');
  });
  app.del('/admin/blog/:blogId', function(req, res) {
    sanitize('blog', 'title');
    sanitize('blog', 'body', 'css');
    res.redirect('/default');
  });
  app.post('/admin/blog/:blogId', function(req, res) {
    sanitize('blog', 'title');
    sanitize('blog', 'body', 'css');
    res.redirect('/default');
  });
};
