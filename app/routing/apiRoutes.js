// Load Survey Data
const matchesData = require("../data/matches");


module.exports = function (app) {
	// Get current data for matches list
	app.get("/api/matches", function (req, res) {
		res.json(matchesData);
	})

	// Post new profile
	app.post("/api/matches", function (req, res) {
		console.log("posting new profile...");

		let newMatchScores = req.body.scores;
		let scoresArray = [];
		let bestMatch = 0;

		//runs through all current friends in list
		for (let i = 0; i < newMatchScores.length; i++) {
			let scoresDiff = 0;
			//run through scores to compare friends
			for (let j = 0; j < newMatchScores.length; j++) {
				scoresDiff += (Math.abs(parseInt(matchesData[i].scores[j]) - parseInt(newMatchScores[j])));
			}

			//push results into scoresArray
			scoresArray.push(scoresDiff);
			console.log("Results pushed to array");
		}

		//after all friends are compared, find best match
		for (let i = 0; i < scoresArray.length; i++) {
			if (scoresArray[i] <= scoresArray[bestMatch]) {
				bestMatch = i;
			}
		}
		console.log("finding best match");

		//return bestMatch data
		let theMatch = matchesData[bestMatch];
		res.json(theMatch);
		console.log("match sent")

		//pushes new submission into the friendsList array
		matchesData.push(req.body);
	});
};