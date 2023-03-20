import uniqid from 'uniqid';

const tasksKey = 'statusToTasks';
const subscriptions = [];
const statuses = {
    backlog: 'backlog',
    ready: 'ready',
    inProgress: 'inProgress',
    finished: 'finished'
};

function getTasks() {
    const json = localStorage.getItem(tasksKey);
    return json ? JSON.parse(json) : {
        [statuses.backlog]: [],
        [statuses.ready]: [],
        [statuses.inProgress]: [],
        [statuses.finished]: [],
    };
}
function findTask(id) {
    const groupedTasks = getTasks();
    const allTasks = Object.values(groupedTasks).flat();

    return allTasks.find(task => task.id === id);
}

function createTask(title) {
    const groupedTasks = getTasks();
    const newTask = {
        id: uniqid(),
        title: title,
        description: ''
    }

    groupedTasks[statuses.backlog].push(newTask);
    save(groupedTasks);

    return newTask;
}

function updateTask(task) {
    const groupedTasks = getTasks();
    const groups = Object.values(groupedTasks);
    let found = false;

    for (let groupIndex = 0; groupIndex < groups.length && !found; ++groupIndex)  {
        const group = groups[groupIndex];
        const taskIndex = group.findIndex(t => t.id === task.id);
        if (taskIndex < 0) {
            continue;
        }

        group[taskIndex] = task;
        found = true;
    }

    if (!found) {
        throw `Task ${task.id} is not found`;
    }

    save(groupedTasks);
}

function moveTask(id, fromStatus, toStatus) {
    const groupedTasks = getTasks();

    const from = groupedTasks[fromStatus];
    const to = groupedTasks[toStatus];

    const taskIndex = from.findIndex((task) => {
        return task.id === id
    })

    const task = from[taskIndex]

    from.splice(taskIndex, 1)
    to.push(task)

    save(groupedTasks);
}

function deleteTask(id) {
    const groupedTasks = getTasks();
    const groups = Object.values(groupedTasks);

    for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
        const group = groups[groupIndex];
        const taskIndex = group.findIndex((task) => {
            return task.id === id
        })

        group.splice(taskIndex, 1)
    }

    save(groupedTasks);
}

function subscribe(callback) {
    subscriptions.push(callback);

    return () => {
        const index = subscriptions.findIndex(subscription => subscription === callback);
        if (index >= 0) {
            subscriptions.splice(index, 1);
        }
    };
}

function save(groupedTasks) {
    localStorage.setItem(tasksKey, JSON.stringify(groupedTasks));
    subscriptions.forEach(callback => callback(groupedTasks));
}

export { statuses, getTasks, findTask, createTask, updateTask, moveTask, deleteTask, subscribe };