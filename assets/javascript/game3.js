// Hangman Game JavaScript

// create variables for the game
var wordBank = [
    "pippen",
    "payton",
    "malone",
    "barkley",
    "olajuwon",
    "robinson",
    "ewing",
    "wilkins",
    "drexler",
    "mutombo",
];

var wins = 0;
var guessesRemaining = 8;

var currentWord = null;
var playersGuess = null;

var lettersInWord = [];
var guessedLetters = [];
var matchedLetters = [];

// set up the game
function setupGame(){
    // reset stats
    guessedLetters = [];
    matchedLetters = [];
    guessesRemaining = 8;
    // randomly select a word from wordBank
    currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    // split this word into individual characters
    lettersInWord = currentWord.split("");
    // wordCount = lettersInWord.length;
    console.log(currentWord);
    // display remaining number of guesses onto page
    document.getElementById('guesses-left').innerHTML = guessesRemaining;
    // run wordSetup
    wordSetup();
};

// run each time player makes a guess
function entry(letter){
    if (guessesRemaining === 0) {
        resetGame();
    }

    else {
        incorrectGuess(letter);
        correctGuess(letter);
        wordSetup();
        if (playerWins() === true) {
            resetGame();
        }
    }
};

/*
    // set this statement to false
    lettersInWord = false;
    // once player guesses, loop through the word (checks for multiples)
    for(var i = 0; i < wordCount; i++){
        // if it is in the word, change statement to true
        if(currentWord[i] === letter){
            lettersInWord = true;
        }
    }
    // if the letter was guessed correctly, show the letter
    if(lettersInWord){
        for(i = 0; i < wordCount; i++){
            if(currentWord[i] === letter){
            matchedLetters[i] = letter;
            }
        }
    }
    // otherwise, reduce the number of guesses remaining by one and put the guessed letter into the 'already guessed' section
    else{
        guessesRemaining --;
        guessedLetters.push(letter)
    }
}; */

function incorrectGuess(letter) {
    if ((guessedLetters.indexOf(letter) === -1) && (lettersInWord.indexOf(letter) === -1)) {
        guessedLetters.push(letter);
        document.getElementById("wrong-guesses").innerHTML = guessedLetters.join("&nbsp;,&nbsp;");

        guessesRemaining--;
        document.getElementById("guesses-left").innerHTML = guessesRemaining;
    }
};

function correctGuess(letter) {
    for (var i = 0; i < lettersInWord.length; i++) {
        if ((letter === lettersInWord[i]) && (matchedLetters.indexOf(letter) === -1)) {
            matchedLetters.push(letter);
        }
    }
};

function wordSetup() {
    var wordReveal = "";
    // for-loop to go through all the letters in the word that was chosen
    for (var i = 0; i < lettersInWord.length; i++) {
        // if the letter the player guessed is correct, reveal that letter
        if (matchedLetters.indexOf(lettersInWord[i]) !== -1) {
            wordReveal += lettersInWord[i];
        }
        // otherwise, continue to display as an underscore
        else {
            wordReveal += "&nbsp;_&nbsp;";
        }
    }
    // show everything above on page
    document.getElementById("current-word").innerHTML = wordReveal;
};

function updatePage(){
    // update html as player makes his/her guesses
    document.getElementById("current-word").innerHTML = matchedLetters.join(" ");
    document.getElementById("guesses-left").innerHTML = guessesRemaining;
    document.getElementById("wrong-guesses").innerHTML = guessedLetters.join(" ");

    // if all letters the player guessed is equal to the letters in the selected word, player wins
    if(lettersInWord === matchedLetters){
        wins++;
        alert("You win!!");
        document.getElementById('win-counter').innerHTML = wins;
        setupGame();
    }

    // otherwise, once the player has zero remaining guesses, he/she loses
    else if(guessesRemaining === 0){
        document.getElementById('wrong-guesses').innerHTML = "";
        alert("you don't have any more guesses");
        setupGame();
    }
};

function resetGame() {

};

setupGame();
document.onkeyup = function(event){
    playersGuess = String.fromCharCode(event.keyCode).toLowerCase();
    entry(playersGuess)
    updatePage();
};