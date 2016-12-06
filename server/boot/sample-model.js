/**
 * Created by guifeng on 2016/12/5.
 */
module.exports = function(app) {
  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  var Game = app.models.game;

  User.create([
    {username: 'demo', email: 'demo@miga.com', password: 'demopass'},
    {username: 'Guifeng', email: 'guifeng@miga.com', password: 'demopass'}
  ], function(err, users) {
    if (err) throw err;

    console.log('Created users:', users);

    // create game 1 and make demo the owner
    users[0].games.create({
      name: 'demogame',
      level: 1,
      score: 1
    }, function(err, game) {
      if (err) throw err;

      console.log('Created game:', game);
    });

    //create project 2 and make jane the owner
    users[1].games.create({
      name: 'My Game',
      level: 2,
      score: 200
    }, function(err, game) {
      if (err) throw err;
      console.log('Created game:', game);
    });

    //create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) throw err;

      console.log('Created role:', role);

      //make bob an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[1].id
      }, function(err, principal) {
        if (err) throw err;

        console.log('Created principal:', principal);
      });
    });
  });
};
