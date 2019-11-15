var friendsData = require("../data/friends.js");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {
    console.log("hit");

    var newUser = req.body;
    var differences = [];
    if (friendsData.length < 1) {
      console.log("unable to do calculation; not enough users");
    } else {
      compareFriends(friendsData, newUser, differences);
      var lowest = differences[0];
      for (var i = 0; i < differences.length; i++) {
        if (differences[i] < lowest) {
          lowest = differences[i];
        }
      }
      var bestMatch = differences.indexOf(lowest);
      res.send(friendsData[bestMatch]);
    }
    friendsData.push(newUser);
  });

  function compareFriends(friendsData, newUser, differences) {
    var curUserIndex = 0;
    while (curUserIndex < friendsData.length) {
      var totalDifference = 0;
      for (var i = 0; i < newUser.scores.length; i++) {
        totalDifference += Math.abs(
          parseInt(friendsData[curUserIndex].scores[i]) -
            parseInt(newUser.scores[i])
        );
      }
      differences.push(totalDifference);
      curUserIndex++;
    }
  }
};
