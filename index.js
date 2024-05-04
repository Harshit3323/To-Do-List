let taskNum = 0;
let display = 1;
let add = document.querySelector('.newItem');
let btn = document.getElementById("newTask");

// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

btn.addEventListener("click", newItem);

document.addEventListener('keydown', function(event) {
    var pressedKey = event.key; // or event.code
    if(pressedKey === "Enter"){
        newItem();
    }
});

function newItem() {
    let taskInput = document.querySelector(".newItem input");
    let taskText = taskInput.value.trim();
    
    if(taskText === '') {    
        alert("What are you up to!? Don't you have something to do?");
        return;
    }
    
    let task = document.createElement("li");
    task.textContent = taskText;
    task.id = "task" + taskNum;
    
    let taskList = document.querySelector('.listContent ul');
    taskList.appendChild(task);
    
    // Save task to local storage
    saveTask(task.id, taskText);
    
    taskInput.value = '';
    taskNum++;
}

// Function to save task to local storage
function saveTask(taskId, taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || {};
    tasks[taskId] = taskText;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || {};
    let taskList = document.querySelector('.listContent ul');
    
    for(let taskId in tasks) {
        let task = document.createElement("li");
        task.textContent = tasks[taskId];
        task.id = taskId;
        taskList.appendChild(task);
    }
}

document.querySelector('.add').addEventListener("click", function() {
    let shadow = document.querySelector(".add");
    shadow.classList.add('shadow');
    setTimeout(() => {shadow.classList.remove('shadow')}, 100);
    
    let ad = document.querySelector('.newItem');
    if(display == 0){
        ad.classList.add('none');
        display++;
    } else {
        ad.classList.remove('none');
        display--;
    }
});
