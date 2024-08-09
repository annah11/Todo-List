const fs = require('fs');
const path = require('path');
const readline = require('readline');


const tasksFilePath = path.join(__dirname, 'tasks.json');


const loadTasks = () => {
    if (fs.existsSync(tasksFilePath)) {
        try {
            const data = fs.readFileSync(tasksFilePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading or parsing tasks file:', error);
            return [];
        }
    } else {
        return [];
    }
};


const saveTasks = (tasks) => {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};


const listTasks = () => {
    const tasks = loadTasks();
    if (tasks.length === 0) {
        console.log('No tasks found.');
    } else {
        tasks.forEach((task, index) => {
            console.log(`${index + 1}. [${task.completed ? 'x' : ' '}] ${task.description}`);
        });
    }
};

const addTask = (description) => {
    const tasks = loadTasks();
    const newTask = { description, completed: false };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`Task added: ${description}`);
};

const editTask = (id, newDescription) => {
    const tasks = loadTasks();
    if (id < 1 || id > tasks.length) {
        console.log('Task not found.');
        return;
    }
    tasks[id - 1].description = newDescription;
    saveTasks(tasks);
    console.log(`Task updated: ${newDescription}`);
};

const removeTask = (id) => {
    const tasks = loadTasks();
    if (id < 1 || id > tasks.length) {
        console.log('Task not found.');
        return;
    }
    tasks.splice(id - 1, 1);
    saveTasks(tasks);
    console.log('Task removed.');
};

const toggleTaskCompletion = (id) => {
    const tasks = loadTasks();
    if (id < 1 || id > tasks.length) {
        console.log('Task not found.');
        return;
    }
    tasks[id - 1].completed = !tasks[id - 1].completed;
    saveTasks(tasks);
    console.log(`Task ${tasks[id - 1].completed ? 'completed' : 'not completed'}.`);
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const handleCommand = (command, args) => {
    switch (command) {
        case 'list':
            listTasks();
            break;
        case 'add':
            if (args.length === 0) {
                console.log('Please provide a task description.');
            } else {
                addTask(args.join(' '));
            }
            break;
        case 'edit':
            if (args.length < 2) {
                console.log('Please provide the task ID and new description.');
            } else {
                const [id, ...description] = args;
                editTask(parseInt(id), description.join(' '));
            }
            break;
        case 'remove':
            if (args.length === 0) {
                console.log('Please provide the task ID.');
            } else {
                removeTask(parseInt(args[0]));
            }
            break;
        case 'toggle':
            if (args.length === 0) {
                console.log('Please provide the task ID.');
            } else {
                toggleTaskCompletion(parseInt(args[0]));
            }
            break;
        default:
            console.log('Unknown command. Use "list", "add", "edit", "remove", or "toggle".');
    }
    rl.close();
};

const [,, command, ...args] = process.argv;
handleCommand(command, args);
