module.exports = function(app) {
  var User = app.models.User;
  User.create({email: 'foo@bar.com', password: 'bar'}, function(err, user) {
    console.log(user);
  })};

module.exports = function(Customer) {

};
