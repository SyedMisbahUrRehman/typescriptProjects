import inquirer from 'inquirer';
import chalk from 'chalk';
import fetch from 'node-fetch';
const API_KEY = 'a1bf0a1de162e7c3a6f676ab66edcc8e';
async function getExchangeRates() {
    try {
        const response = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}&format=1`);
        if (!response.ok) {
            throw new Error(`Error fetching exchange rates: ${response.status}`);
        }
        return (await response.json());
    }
    catch (error) {
        console.error(`Error fetching exchange rates: ${error.message}`);
        return null;
    }
}
async function convertCurrency(exchangeRates) {
    const questions = [
        {
            type: 'input',
            name: 'amount',
            message: 'Enter the amount to convert:',
            validate: (input) => !isNaN(parseFloat(input)),
        },
        {
            type: 'list',
            name: 'fromCurrency',
            message: 'Select the source currency:',
            choices: Object.keys(exchangeRates.rates),
        },
        {
            type: 'list',
            name: 'toCurrency',
            message: 'Select the target currency:',
            choices: Object.keys(exchangeRates.rates),
        },
    ];
    const answers = await inquirer.prompt(questions);
    const amount = parseFloat(answers.amount);
    const fromCurrencyRate = exchangeRates.rates[answers.fromCurrency];
    const toCurrencyRate = exchangeRates.rates[answers.toCurrency];
    const convertedAmount = (amount / fromCurrencyRate) * toCurrencyRate;
    console.log(chalk.green(`Converted amount: ${convertedAmount.toFixed(2)} ${answers.toCurrency}`));
}
async function main() {
    console.clear();
    console.log(chalk.blue.bold('Currency Converter'));
    try {
        const exchangeRates = await getExchangeRates();
        if (exchangeRates) {
            await convertCurrency(exchangeRates);
        }
    }
    catch (error) {
        console.error(chalk.red('An error occurred:', error.message));
    }
}
main();
