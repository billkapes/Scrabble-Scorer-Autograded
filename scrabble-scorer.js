// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function transform(oldStructure) {
   let newStructure = {};
   for (let pointLevel in oldStructure) {
      for (let i = 0; i < oldPointStructure[pointLevel].length; i++) {
         newStructure[oldPointStructure[pointLevel][i].toLowerCase()] = Number(pointLevel);
      }
   }
   return newStructure;
};

let newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = 0;

let userWord = '';

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   userWord = input.question("Enter a word to score: ");
};

let simpleScorer = function(word) {
   return word.length;
}

let vowelBonusScorer = function(word) {
   word = word.toLowerCase();
   let vowels = ['a','e','i','o','u'];
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         score += 3;
      } else {
         score++;
      }
   }
   return score;
}

let scrabbleScorer = function(word) {
   word = word.toLowerCase();
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      score += newPointStructure[word[i]];
   }
   return score;
}

let simpleScoreAlgo = {
   name: "Simple Score",
   description: "Each letter is worth 1 point",
   scorerFunction: simpleScorer
};

let vowelBonusScorerAlgo = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
};

let scrabbleScorerAlgo = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
}

const scoringAlgorithms = [simpleScoreAlgo, vowelBonusScorerAlgo, scrabbleScorerAlgo];

function scorerPrompt() {
   console.log('Which scoring algorithm would you like to use?\n');
   for (let i = 0; i < scoringAlgorithms.length; i++) {
      console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
   }
   let scoreChoice = input.question("Enter 0, 1, or 2: ");
   while (![0, 1, 2].includes(Number(scoreChoice))) {
      scoreChoice = input.question("Invalid choice. Please enter 0, 1, or 2: ");
   }
   return scoringAlgorithms[Number(scoreChoice)];
}

function runProgram() {
   initialPrompt();
   console.log(`Score for '${userWord}': ${scorerPrompt().scorerFunction(userWord)}`);
}

module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
