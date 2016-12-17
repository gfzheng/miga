module.exports = function(Game) {
// listGames
  Game.listGames = function(cb) {
    Game.find({
      fields: {
        level: false,
        score: false
      }
    }, cb);
  };
  Game.remoteMethod('listGames', {
    returns: {arg: 'games', type: 'array'},
    http: {path:'/list-games', verb: 'get'}
  });
};
