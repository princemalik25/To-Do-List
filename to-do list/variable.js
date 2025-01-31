// Get references to the input field, button, and unordered list
let input = document.getElementById("ip"); // Input field
let button = document.querySelector(".btn"); // Add button
let taskList = document.querySelector(".unorderlist ul"); // Unordered list

// Load tasks from Local Storage when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        addTaskToDOM(task.text, task.completed);
    });
});

// Add event listener to the button
button.addEventListener("click", () => {
    const taskText = input.value.trim();

    if (taskText !== "") {
        addTaskToDOM(taskText); // Add the task to the DOM
        saveTaskToLocalStorage(taskText); // Save the task to Local Storage
        input.value = ""; // Clear the input field
    } else {
        alert("Please enter a task!");
    }
});

// Function to add a task to the DOM
function addTaskToDOM(taskText, isCompleted = false) {
    // Create a new list item (<li>)
    const newTask = document.createElement("li");
    newTask.textContent = taskText; // Set the text of the list item

    // Create a check button
    const checkButton = document.createElement("button");
    checkButton.textContent = "✔️"; // Use a checkmark emoji or icon
    checkButton.classList.add("check-button");

    // Add event listener to the check button
    checkButton.addEventListener("click", () => {
        newTask.classList.toggle("completed"); // Toggle the "completed" class
        updateTaskInLocalStorage(taskText, newTask.classList.contains("completed"));
    });

    // Create a delete button for the task
    const deleteIcon = document.createElement("img");
    deleteIcon.src = "img/pngwing.com.png"; // Path to the delete icon
    deleteIcon.alt = "Delete"; // Accessibility
    deleteIcon.title = "Delete Task"; // Tooltip
    deleteIcon.classList.add("delete-icon");

    // Add event listener to the delete button
    deleteIcon.addEventListener("click", () => {
        newTask.remove(); // Remove the task from the DOM
        removeTaskFromLocalStorage(taskText); // Remove the task from Local Storage
    });

    // Append the check button and delete button to the new task
    newTask.appendChild(checkButton);
    newTask.appendChild(deleteIcon);

    // Append the new task to the unordered list
    taskList.appendChild(newTask);

    // If the task is completed, add the "completed" class
    if (isCompleted) {
        newTask.classList.add("completed");
    }
}

// Function to save a task to Local Storage
function saveTaskToLocalStorage(taskText, isCompleted = false) {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.push({ text: taskText, completed: isCompleted });
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

// Function to update a task's completed state in Local Storage
function updateTaskInLocalStorage(taskText, isCompleted) {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = savedTasks.findIndex(task => task.text === taskText);
    if (taskIndex !== -1) {
        savedTasks[taskIndex].completed = isCompleted;
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    }
}

// Function to remove a task from Local Storage
function removeTaskFromLocalStorage(taskText) {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = savedTasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}