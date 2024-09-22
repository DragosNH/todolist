let submitBtn = document.querySelector(".submit");
let text = document.querySelector("#text");
let taskList = document.querySelector("#task-list");

let removeAll = document.createElement("button");
removeAll.classList.add("removeAll");
removeAll.innerText = "Remove All";
document.body.appendChild(removeAll)

// Load tasks from localStorage when the page loads
window.addEventListener("load", function() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(function(taskText) {
        createTaskItem(taskText);
    });
});

// Function to create a task item
function createTaskItem(taskText) {
    let newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";

    let newLabel = document.createElement("label");
    newLabel.classList.add("label-item");
    newLabel.innerText = taskText;

    let removeBtn = document.createElement("button");
    removeBtn.classList.add("removeBtn");
    removeBtn.innerText = "remove";

    let newDiv = document.createElement("div");
    newDiv.classList.add("task-item");
    newDiv.appendChild(newCheckbox);
    newDiv.appendChild(newLabel);
    newDiv.appendChild(removeBtn);
    taskList.appendChild(newDiv);

    // Toggle task completion
    newCheckbox.addEventListener("change", function() {
        if (newCheckbox.checked) {
            newLabel.classList.add("active");
        } else {
            newLabel.classList.remove("active");
        }
    });

    // Remove individual task
    removeBtn.addEventListener("click", function() {
        newDiv.remove();
        updateLocalStorage();
    });
}

// Function to update localStorage
function updateLocalStorage() {
    let tasks = [];
    document.querySelectorAll(".label-item").forEach(function(label) {
        tasks.push(label.innerText);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add new task and save to localStorage
submitBtn.addEventListener("click", function() {
    let taskText = text.value;
    if (taskText.trim() !== "") {
        createTaskItem(taskText);
        updateLocalStorage();
    }
    text.value = ""; // Clear textarea after adding task
});

removeAll.addEventListener("click", function() {
    taskList.innerHTML = ""; // Clear all tasks from the DOM
    localStorage.removeItem("tasks"); // Clear all tasks from localStorage
});