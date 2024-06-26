let tasks = [];
let completedTasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDateTime = new Date(document.getElementById('dueDateTime').value);
    const taskText = taskInput.value.trim();
    if (taskText !== '' && !isNaN(dueDateTime.getTime())) {
        const task = {
            text: taskText,
            dueDate: dueDateTime,
            completed: false
        };
        tasks.push(task);
        tasks.sort((a, b) => a.dueDate - b.dueDate); // Sort tasks by due date
        updateTaskList();
        taskInput.value = '';
        document.getElementById('dueDateTime').value = '';
    }
}

function updateTaskList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'task';
        if (task.completed) {
            listItem.className += ' completed-task';
            listItem.innerHTML = `
                <span class="text">${task.text} - ${task.dueDate.toLocaleString()}</span>
                <button class="undo-button" onclick="undoTask(${index})">Undo</button>
            `;
        } else {
            listItem.innerHTML = `
                <span class="text">${task.text} - ${task.dueDate.toLocaleString()}</span>
                <button class="delete-button" onclick="deleteTask(${index})">Delete</button>
                <button class="complete-button" onclick="completeTask(${index})">Complete</button>
            `;
            if (task.dueDate < new Date()) {
                listItem.className += ' overdue-task';
            }
        }
        taskList.appendChild(listItem);
    });
    updateCompletedTaskList();
    updateCompletionPercentage();
    checkReminders();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
}

function completeTask(index) {
    const task = tasks[index];
    task.completed = true;
    completedTasks.push(task);
    tasks.splice(index, 1); // Remove task from active list
    updateTaskList();
}

function undoTask(index) {
    const task = completedTasks[index - tasks.length];
    task.completed = false;
    completedTasks.splice(index - tasks.length, 1); // Remove task from completed list
    tasks.push(task);
    tasks.sort((a, b) => a.dueDate - b.dueDate); // Sort tasks by due date
    updateTaskList();
}


function showCompletedTasks() {
    const completedTasksDiv = document.getElementById('completedTasks');
    const button = completedTasksDiv.previousElementSibling;
    completedTasksDiv.style.display = completedTasksDiv.style.display === 'none' ? 'block' : 'none';
    button.textContent = completedTasksDiv.style.display === 'none' ? 'Show Completed Tasks' : 'Hide Completed Tasks';
    updateCompletedTaskList();
}

function updateCompletedTaskList() {
    const completedTaskList = document.getElementById('completedTaskList');
    completedTaskList.innerHTML = '';
    completedTasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'task completed-task';
        listItem.innerHTML = `
            <span class="text">${task.text} - ${task.dueDate.toLocaleString()}</span>
            <button class="undo-button" onclick="undoTask(${tasks.length + index})">Undo</button>
        `;
        completedTaskList.appendChild(listItem);
    });
}

function updateCompletionPercentage() {
    const totalTasks = tasks.length + completedTasks.length;
    const completedPercentage = Math.round((completedTasks.length / totalTasks) * 100);
    document.getElementById('completionPercentage').textContent = `COMPLETION: ${completedPercentage}%`;
    document.getElementById('progressBar').style.width = `${completedPercentage}%`;
}

function checkReminders() {
    const now = new Date().getTime();
    tasks.forEach(task => {
        const dueDateTime = task.dueDate.getTime();
        const timeDifference = dueDateTime - now;
        if (timeDifference < 0 && !task.completed) {
            alert(`Reminder: Task "${task.text}" is overdue!`);
        } else if (timeDifference < 3600000) { // 1 hour in milliseconds
            const remainingMinutes = Math.floor(timeDifference / 60000);
            alert(`Reminder: Task "${task.text}" due in ${remainingMinutes} minutes!`);
        }
    });
}


const desktopImages = [
    "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1183099/pexels-photo-1183099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1529881/pexels-photo-1529881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/20141645/pexels-photo-20141645/free-photo-of-rain-cloud-on-sky-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/957002/berchtesgaden-alpine-watzmann-berchtesgaden-national-park-957002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/545521/pexels-photo-545521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1022411/pexels-photo-1022411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/709689/pexels-photo-709689.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
];

const mobileImages = [
    "https://images.pexels.com/photos/886051/pexels-photo-886051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/33696/night-star-moon-big-bar.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/775200/pexels-photo-775200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/4388593/pexels-photo-4388593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/4666754/pexels-photo-4666754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2877375/pexels-photo-2877375.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2422914/pexels-photo-2422914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/20201053/pexels-photo-20201053/free-photo-of-road-in-dark-forest.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/4394196/pexels-photo-4394196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1252871/pexels-photo-1252871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1453784/pexels-photo-1453784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
];

// Function to set a random background image
function setRandomBackground() {
    const isMobile = window.innerWidth <= 600;
    const images = isMobile ? mobileImages : desktopImages;
    const randomIndex = Math.floor(Math.random() * images.length);
    const backgroundImage = "url('" + images[randomIndex] + "')";
    const bodyElement = document.body;
    const hiddenPreloader = document.querySelector('.hidden-preloader');

    // Smooth transition between background images
    bodyElement.style.transition = 'background-image 0.5s ease';
    bodyElement.style.backgroundImage = backgroundImage;
}

// Call the function initially to set the background
setRandomBackground();

// Change the background image every 15 minutes (in milliseconds)
setInterval(setRandomBackground, 0.15 * 60 * 1000);