module.exports = function(server) {
 var router = server.loopback.Router();
  router.get('/', function(req, res) {
    res.render('index');
  });
  server.use(router);



  server.post('/login', function(req, res) {
    User.login({
      email: req.body.email,
      password: req.body.password
    }, 'user', function(err, token) {
      if (err) {
        res.render('response', { //render view named 'response.ejs'
          title: 'Login failed',
          content: err,
          redirectTo: '/',
          redirectToLinkText: 'Try again'
        });
        return;
      }
 
      res.render('home', { //login user and render 'home' view
        email: req.body.email,
        accessToken: token.id
      });
    });
  });
};


