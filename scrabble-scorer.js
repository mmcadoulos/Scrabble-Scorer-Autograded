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

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

 function simpleScorer(word){
   let score = 0;
   for (let i = 0; i < word.length; i++){
      for (const pointValue in oldPointStructure){
         if (oldPointStructure[pointValue].includes(word.toUpperCase()[i])){
            score ++;
         }
      }
   }
   return score;
}

function vowelBonusScorer(word){
   let score = 0;
   let vowels = ["A", "E", "I", "O", "U"];
   word = word.toUpperCase();
   for (let i = 0; i < word.length; i++){
      for (items in oldPointStructure){
         if (oldPointStructure[items].includes(word[i])){
            if (vowels.includes(word[i])){
               score += 3;
            } else {
               score ++;
            }
         }
      }
   }   
   return score;
}

function scrabbleScorer(word){
   let score = 0;
   for (let i = 0; i < word.length; i++){
      score += newPointStructure[word.toLowerCase()[i]];
   } 
   return score;
}

 // your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   userWord = input.question("Let's play some scrabble!\n\nEnter a word: ");
   //console.log(`You entered: ${userWord}`);
   //console.log(oldScrabbleScorer(userWord));
};

let simple = {
   name: "SimpleScore",
   description: "Each letter is worth 1 point.",  
   scorerFunction: simpleScorer
};

let vowelBonus = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
};

let scrabble = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
};

const scoringAlgorithms = [simple, vowelBonus, scrabble];

function scorerPrompt() {
   console.log("Select the scoring method you would like to use:\n");
   console.log("0 - Simple: One point per character");
   console.log("1 - Vowel Bonus: Vowels are worth 3 points");
   console.log("2 - Scrabble: Uses scrabble point system");
   scorerSelect = input.question("Enter 0, 1, or 2: ");
   console.log("selected scoring method:", scoringAlgorithms[scorerSelect].name);
   console.log(`"score for '${userWord}': ${scoringAlgorithms[scorerSelect].scorerFunction(userWord)}`);
   return scoringAlgorithms[scorerSelect];
}

function transform(obj) {
   let objNew = {};
   for (const item in obj){
      for (let i = 0; i < obj[item].length; i++){
      //console.log(obj[item][i]);
      objNew[obj[item][i].toLowerCase()] = Number(item);
      }
   } 
   return objNew;
};

let newPointStructure = transform(oldPointStructure);



function runProgram() {
    initialPrompt();
    scorerPrompt();


   // console.log("algorithm name: ", scoringAlgorithms[0].name);
   // console.log("scoringFunction result: ", scoringAlgorithms[0].scoringFunction("JavaScript"));



   //console.log(scrabbleScorer.ScoreFunction("banana"));
   //console.log(newPointStructure);
   //console.log(transform(oldPointStructure));
   //console.log(oldScrabbleScorer(userWord));
   //console.log(simpleScorer(userWord));
   //console.log(vowelBonusScorer(userWord));
   //console.log(vowelBonusScorer["ScoreFunction"](userWord));
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
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