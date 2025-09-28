const addTaskBtn = document.getElementById("addtaskbutton");
const taskInput = document.getElementById("taskinputbox");
const urgencySelect = document.getElementById("urgency");
const taskList = document.getElementById("task-list");

function createTask(text, urgency,completed=false) {
    const task = document.createElement("div");
    task.classList.add("task", urgency); // add urgency class for styling

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    const taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.textContent = text;

    if(completed) { // CROSS OVER THE TEXT IF ITS COMPLETED 
        taskText.style.textDecoration = 'line-through';
        taskText.style.opacity = '0.6';
    }

    const urgencyLabel = document.createElement("span");
    urgencyLabel.classList.add("urgency", urgency);
    urgencyLabel.textContent = urgency.charAt(0).toUpperCase() + urgency.slice(1);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";

    task.appendChild(checkbox);
    task.appendChild(taskText);
    task.appendChild(urgencyLabel);
    task.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", () => {
        task.remove();
        savedata();
    });

    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            taskText.style.textDecoration = "line-through";
            taskText.style.opacity = "0.6";
        } else {
            taskText.style.textDecoration = "none";
            taskText.style.opacity = "1";
        }
        savedata();
    });

    taskList.appendChild(task);
    savedata();
}

function savedata() {
    const tasks = [];
    document.querySelectorAll(".task").forEach(task => {
        const text = task.querySelector(".task-text").textContent;
        const urgency = task.querySelector('.urgency').classList.contains('high') ? "high" :
                        task.querySelector('.urgency').classList.contains('medium') ? 'medium' : 'low';
        const completed = task.querySelector("input[type='checkbox']").checked;
        tasks.push({text,urgency,completed});

    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function pulldata() {
    const saved = JSON.parse(localStorage.getItem('tasks') || '[]'); // Get an empty list if localstorage is empty
    saved.forEach(task => {
        createTask(task.text,task.urgency,task.completed)
    })
}

document.addEventListener('DOMContentLoaded', ()=> {
    pulldata()
    addTaskBtn.addEventListener("click", () => {
        const text = taskInput.value.trim();
        const urgency = urgencySelect.value;

        if (text === "") {
            alert("Please enter a task!");
            return;
        }
        createTask(text, urgency);
        taskInput.value = "";
    });
});

