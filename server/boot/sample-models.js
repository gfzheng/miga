/**
 * Created by guifeng on 2016/12/5.
 */
module.exports = function(app) {
  var Player = app.models.player;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  var Renwu = app.models.renwu;

  Renwu.create(
    [{xing: "诸葛", ming:"亮", zi:"孔明", xingbie:"男", xugou: false}],
    function(err, renwu) {
      if (err) throw err;

      console.log('Created renwu:', renwu);
    }
  );

  Player.create([
    {username: 'DemoUser', email: 'demo@miga.com', password: 'demopass'},
    {username: 'Guifeng', email: 'guifeng@miga.com', password: 'demopass'}
  ], function(err, players) {
    if (err) throw err;

    console.log('Created players:', players);

    // create game 1 and make demo the owner
    players[0].games.create({
      name: 'Demo Game',
      level: 1,
      score: 1
    }, function(err, game) {
      if (err) throw err;

      console.log('Created game:', game);
    });

    //create project 2 and make guifeng the owner
    players[1].games.create({
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

      //make guifeng an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: players[1].id
      }, function(err, principal) {
        if (err) throw err;

        console.log('Created principal:', principal);
      });
    });
  });
};
