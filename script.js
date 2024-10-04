function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = task.text;
        if (task.completed) {
            listItem.classList.add('completed');
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            taskList.removeChild(listItem);
            saveTasks();
        };

        listItem.appendChild(deleteButton);
        listItem.onclick = () => {
            listItem.classList.toggle('completed');
            saveTasks();
        };

        taskList.appendChild(listItem);
    });
}

function saveTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = [];
    taskList.querySelectorAll('li').forEach(item => {
        tasks.push({
            text: item.firstChild.textContent,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskList = document.getElementById('task-list');
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
        taskList.removeChild(listItem);
        saveTasks();
    };

    listItem.appendChild(deleteButton);
    listItem.onclick = () => {
        listItem.classList.toggle('completed');
        saveTasks();
    };

    taskList.appendChild(listItem);
    taskInput.value = '';
    saveTasks();
}

document.getElementById('new-task').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

window.addEventListener('load', loadTasks);
