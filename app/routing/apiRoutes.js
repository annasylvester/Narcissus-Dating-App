// Load Survey Data
var matchesData = require("../data/matches");


module.exports = function (app) {
	// Get current data for matches list
	app.get("/api/matches", function (req, res) {
		res.json(matchesData);
	})

	// Post new profile
	app.post("/api/matches", function (req, res) {
		console.log("posting new profile...");

		var newFriendScores = req.body.scores;
		var scoresArray = [];
		var friendCount = 0;
		var bestMatch = 0;

		//runs through all current friends in list
		for (var i = 0; i < matchesData.length; i++) {
			var scoresDiff = 0;
			//run through scores to compare friends
			for (var j = 0; j < newFriendScores.length; j++) {
				scoresDiff += (Math.abs(parseInt(matchesData[i].scores[j]) - parseInt(newFriendScores[j])));
			}

			//push results into scoresArray
			scoresArray.push(scoresDiff);
			console.log("Results pushed to array");
		}

		//after all friends are compared, find best match
		for (var i = 0; i < scoresArray.length; i++) {
			if (scoresArray[i] <= scoresArray[bestMatch]) {
				bestMatch = i;
			}
		}
		console.log("finding best match");

		//return bestMatch data
		var bff = matchesData[bestMatch];
		res.json(bff);
		console.log("match sent")

		//pushes new submission into the friendsList array
		matchesData.push(req.body);
	});
};