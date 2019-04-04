/*The player will have to guess the answer, just like in Word Guess. This time, though, the player will guess with numbers instead of letters. 
Here's how the app works:



There will be four crystals displayed as buttons on the page.
The player will be shown a random number at the start of the game.

When the player clicks on a crystal, it will add a specific amount of points to the player's total score. 


Your game will hide this amount until the player clicks a crystal.
When they do click one, update the player's score counter.


The player wins if their total score matches the random number from the beginning of the game.
The player loses if their score goes above the random number.

The game restarts whenever the player wins or loses.


When the game begins again, the player should see a new random number. Also, all the crystals will have four new hidden values. Of course, the user's score (and score counter) will reset to zero.


The app should show the number of games the player wins and loses. To that end, do not refresh the page as a means to restart the game.



Option 1 Game design notes


The random number shown at the start of the game should be between 19 - 120.
Each crystal should have a random hidden value between 1 - 12.*/

var wins = 0;
var losses = 0;
var runningTotal = 0;
var numberOfCrystals = 4;
var crystalVals;
var computerGenVal = 0;

function startgame() {
    // From the very start the random number gets generated between 19 and 120
    computerGenVal = Math.floor(Math.random() * 102) + 19;
    $("#target-number").html(computerGenVal);
    console.log("randomValue generated: ", computerGenVal);

    // when restarting, make sure the screen is updated...
    // and I only have to write this once no matter how we got here...
    $("#running-total").html(0);
    $("#wins-line").html("Wins: " + wins);
    $("#losses-line").html("Losses: " + losses);

    var done = false;
    var index = 0;
    runningTotal = 0;
    crystalVals = [0, 0, 0, 0];

    // be very carful with this.  possibilities for infinite loops abound
    while (done === false) { // create 4 non-duplcate random values 
        //and install them into the array
        var addAVal = true;
        var crystalTempGenVal = Math.floor(Math.random() * 12) + 1;
        for (var idx2 = 0; idx2 < index; idx2++) {
            // loop through the crystalVals, looking for a duplicate to the
            // random value just generated
            if (crystalVals[idx2] === crystalTempGenVal) {
                addAVal = false;
                //console.log("duplicate found! ", crystalTempGenVal);
                break; // will return processing to the statement immediately
                // following the end of the for loop.   Not strickly necessary
                // in this case.  -msm
            }
        }
        if (addAVal) {
            crystalVals[index] = crystalTempGenVal;
            index++;
            //console.log("Index: ", index);
            //console.log("value of crystal: ", crystalTempGenVal);
        }
        if (index === crystalVals.length) { done = true; }
    }



}




$(document).ready(function() {

    startgame();
    //console.log("computerGenVal just after startgame called: ", computerGenVal);

    $(".crystal").on("click", function() {
        console.log($(this).val());

        runningTotal += crystalVals[$(this).val()];
        $("#running-total").html(runningTotal);
        if (runningTotal === computerGenVal) {
            //player wins
            console.log("Winner!!!");
            wins++;
            $("#winner-loser").html("Winner!!!");
            startgame();
        } else if (runningTotal > computerGenVal) {
            // player loses
            console.log("Loser!!!");
            //console.log("runningTotal=", runningTotal);
            //console.log("computerGenVal", computerGenVal);
            losses++;
            $("#winner-loser").html("Loser!!!");
            startgame();
        }
    });

});