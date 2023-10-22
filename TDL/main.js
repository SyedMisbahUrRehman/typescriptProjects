import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkRainbow from 'chalk-rainbow';
const todos = [];
async function main() {
    console.clear();
    console.log(chalkRainbow('Todo App'));
    while (true) {
        const { choice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Choose an action:',
                choices: [
                    'Add a task',
                    'List tasks',
                    'Mark a task as completed',
                    'Exit',
                ],
            },
        ]);
        if (choice === 'Add a task') {
            const { task } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'task',
                    message: 'Enter the task:',
                },
            ]);
            todos.push({ task, completed: false });
            console.log(chalk.green('Task added!'));
        }
        else if (choice === 'List tasks') {
            if (todos.length === 0) {
                console.log(chalk.yellow('No tasks found.'));
            }
            else {
                console.log(chalk.blue.bold('Tasks:'));
                todos.forEach((todo, index) => {
                    const status = todo.completed ? '[X]' : '[ ]';
                    console.log(`${index + 1}. ${status} ${todo.task}`);
                });
            }
        }
        else if (choice === 'Mark a task as completed') {
            if (todos.length === 0) {
                console.log(chalk.red('No tasks found.'));
            }
            else {
                const tasksToMark = await inquirer.prompt([
                    {
                        type: 'checkbox',
                        name: 'tasks',
                        message: 'Select tasks to mark as completed:',
                        choices: todos.map((todo, index) => ({
                            name: `${index + 1}. [ ] ${todo.task}`,
                            value: index,
                        })),
                    },
                ]);
                tasksToMark.tasks.forEach((index) => {
                    todos[index].completed = true;
                });
                console.log(chalk.green('Tasks marked as completed!'));
            }
        }
        else if (choice === 'Exit') {
            console.log(chalk.cyan('Goodbye!'));
            process.exit(0);
        }
    }
}
main();
