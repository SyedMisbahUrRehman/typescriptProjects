import inquirer from "inquirer";
import chalk from "chalk";

const correctPin = "5050";
const balance = (Math.random() * 1000).toFixed(2);
const maxTries = 3;

async function checkPin(): Promise<void> {
    for (let tries = 0; tries < maxTries; tries++) {
        const answers = await inquirer.prompt([
            {
                name: "pin",
                message: `Enter your 4-digit PIN (Attempt ${tries + 1}/${maxTries}):`,
                type: "password",
                mask: "*",
            },
        ]);

        if (answers.pin === correctPin) {
            console.log(chalk.blue(`Access granted. Your balance is ${chalk.italic.magentaBright(balance)} USD`));
            return; // Exit the loop if the PIN is correct.
        } else {
            console.log(chalk.bgRed("Incorrect PIN."));
        }
    }

    console.log(chalk.bgMagenta("Maximum attempts reached. Access denied."));
}

console.log(chalk.cyan("Welcome to the Secure ATM"));
checkPin();
