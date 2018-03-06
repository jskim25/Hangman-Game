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

var currentWord = "";
var wordCount = [];
var matchedLetters = [];
var guessedLetters = [];

var wins = 0;
var blanksInWord = 0;
var guessesRemaining = 8;

// set up the game to start
function startGame() {
    // empty array and set number of guesses
    guessedLetters = [];
    matchedLetters = [];
    guessesRemaining = 8;
    document.getElementById('guesses-left').innerHTML = guessesRemaining;
    // randomly select word from wordBank
    currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    // split the word up into individual characters
    wordCount = currentWord.split("");
    blanksInWord = wordCount.length;
    // console.log(currentWord);

    // instead of showing the split characters, replace it with underscores
    for (var i = 0; i < blanksInWord; i++){
        matchedLetters.push("_");
    }
    // push this to the page
    document.getElementById('current-word').innerHTML = matchedLetters.join(" ");
};

// check the player's guesses
function checkLetters(letter) {
    var letterInWord = false;
    // loop through the current word (checks for multiples)
    for (var i = 0; i < blanksInWord; i++){
        if (currentWord[i] === letter){
            letterInWord = true;
        }
    }
    // if the guessed letter matches the letter(s) in the word, then reveal to player
    if (letterInWord){
        for (i = 0; i < blanksInWord; i++) {
            if(currentWord[i] === letter) {
            matchedLetters[i] = letter;
            }
        }
    }
    // how to get game not to deduct remaining guesses if letter has already been guessed?? 

    // otherwise, reduce the number of guesses remaining by one and push the guessed letter into the 'guessedLetters' array
    else {
        guessesRemaining --;
        guessedLetters.push(letter)
    }
};

function updatePage() {
    // update to show the letters that have been guessed correctly
    document.getElementById('current-word').innerHTML = matchedLetters.join(" ");
    // update to show current number of guesses remaining
    document.getElementById('guesses-left').innerHTML = guessesRemaining;
    // update to show the incorrect guesses
    document.getElementById('wrong-guesses').innerHTML = guessedLetters.join(" ");

    // if the word has been guessed completely
    if(wordCount.join(" ") === matchedLetters.join(" ")) {
        // increase the wins by one; alert the player of the win; restart the game
        wins++;
        alert("that was a slam dunk!");
        document.getElementById('win-counter').innerHTML = wins;
        startGame();
    // otherwise, if the remaining number of guesses reaches zero
    }
    else if(guessesRemaining === 0){
        // alert the player that they are out of guesses and to try again; reset so that no letters have been guessed
        alert("sorry, out of guesses. try again!");
        startGame();
        document.getElementById('wrong-guesses').innerHTML = "";
    }
};

startGame();
document.onkeyup = function(event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed)
    updatePage();
};