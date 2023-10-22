import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkRainbow from 'chalk-rainbow';
let targetNumber = generateRandomNumber(1, 100);
let numberOfGuesses = 0;
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function playGame() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'guess',
            message: 'Guess the number (between 1 and 100):',
            validate: (input) => {
                const number = parseInt(input);
                if (isNaN(number) || number < 1 || number > 100) {
                    return 'Please enter a valid number between 1 and 100.';
                }
                return true;
            },
        },
    ])
        .then((answers) => {
        const userGuess = parseInt(answers.guess);
        numberOfGuesses++;
        if (userGuess === targetNumber) {
            console.log(chalk.green(`Congratulations! You guessed the number in ${numberOfGuesses} guesses.`));
            playAgain();
        }
        else if (userGuess < targetNumber) {
            console.log(chalk.blue('Try a higher number.'));
            playGame();
        }
        else {
            console.log(chalk.blue('Try a lower number.'));
            playGame();
        }
    });
}
function playAgain() {
    inquirer
        .prompt([
        {
            type: 'confirm',
            name: 'playAgain',
            message: 'Do you want to play again?',
        },
    ])
        .then((answers) => {
        if (answers.playAgain) {
            targetNumber = generateRandomNumber(1, 100);
            numberOfGuesses = 0;
            console.log(chalk.magenta('Great! Let\'s play again.'));
            playGame();
        }
        else {
            console.log(chalk.yellow('Thanks for playing! Goodbye.'));
        }
    });
}
console.log(chalkRainbow('Welcome to the Number Guessing Game'));
playGame();
