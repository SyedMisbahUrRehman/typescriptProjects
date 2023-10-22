#! /usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';

console.log(
  chalk.bold.rgb(255, 105, 180)('Welcome to the CLI Calculator by MSB')
);

function calculate(): void {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'num1',
        message: 'Enter the first number:',
      },
      {
        type: 'input',
        name: 'num2',
        message: 'Enter the second number:',
      },
      {
        type: 'list',
        name: 'operation',
        message: 'Select an operation:',
        choices: ['Add', 'Subtract', 'Multiply', 'Divide', 'Power'],
      },
    ])
    .then((answers) => {
      const num1 = parseFloat(answers.num1);
      const num2 = parseFloat(answers.num2);

      if (isNaN(num1) || isNaN(num2)) {
        console.log(chalk.red('Please enter valid numbers.'));
      } else {
        let result: number;

        switch (answers.operation) {
          case 'Add':
            result = num1 + num2;
            break;
          case 'Subtract':
            result = num1 - num2;
            break;
          case 'Multiply':
            result = num1 * num2;
            break;
          case 'Divide':
            if (num2 === 0) {
              console.log(chalk.red('Division by zero is not allowed.'));
              return;
            }
            result = num1 / num2;
            break;
          case 'Power':
            result = Math.pow(num1, num2);
            break;
          default:
            console.log(chalk.red('Invalid operation.'));
            return;
        }

        console.log(chalk.green(`Result: ${result}`));
      }
    });
}

calculate();
