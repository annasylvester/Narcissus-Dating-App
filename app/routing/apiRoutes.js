// Load Survey Data
var matchesData = require("../data/matches");


module.exports = function (app) {
	// Get current data for matches list
	app.get("/api/matches", function (req, res) {
		res.json(matchesData);
	})

	// Post new profile
	app.post("/api/matches", function (req, res) {

		var newMatchData = req.body.scores;
		var scoresArray = [];
		var bestMatch = 0;

		//runs through all current friends in list
		for (var i = 0; i < matchesData.length; i++) {
			var scoresDiff = 0;
			//run through scores to compare friends
			for (var j = 0; j < newMatchData.length; j++) {
				scoresDiff += (Math.abs(parseInt(matchesData[i].scores[j]) - parseInt(newMatchData[j])));
			}

			//push results into scoresArray
			scoresArray.push(scoresDiff);
		}

		//after all friends are compared, find best match
		for (var i = 0; i < scoresArray.length; i++) {
			if (scoresArray[i] <= scoresArray[bestMatch]) {
				bestMatch = i;
			}
		}

		//return bestMatch data
		var theMatch = matchesData[bestMatch];
		res.json(theMatch);

		//pushes new submission into the friendsList array
		matchesData.push(req.body);
	});
};