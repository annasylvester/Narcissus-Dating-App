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
        let previousMatchScores = req.body.scores;
        let scoresArray = [];
        let bestMatch = 0;

        // gather data from all potential matches
        for (let i=0; i<matchesData.length; i++){
            let scoresDiff = 0;
            for (let j=0; i<previousMatchScores.length; j++){
                console.log("before parsing")
                // issue right here
                scoresDiff += (Math.abs(parseInt(matchesData[i].scores[j]) - parseInt(previousMatchScores[j])));
                console.log("after parsing")
            }
            scoresArray.push(scoresDiff);
        }
        console.log("scores sent to arrAY")
        

        // find best match
        for (let i=0; i<scoresArray.length; i++){
            if(scoresArray[i] <= scoresArray[bestMatch]){
                bestMatch = i;
            }
        }
        console.log("finding best match....")

        // return best match
        let usersMatch = matchesData[bestMatch];
        res.json(usersMatch);

        // push new submission into matches data
        matchesData.push(req.body);

    })

}
