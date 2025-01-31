// Get references to the input field, button, and unordered list
let input = document.getElementById("ip"); // Input field
let button = document.querySelector(".btn"); // Add button
let taskList = document.querySelector(".unorderlist ul"); // Unordered list

// Add event listener to the button
button.addEventListener("click", () => {
    // Get the value of the input field and trim whitespace
    const taskText = input.value.trim();

    // Check if the input is not empty
    if (taskText !== "") {
        // Create a new list item (<li>)
        const newTask = document.createElement("li");
        newTask.textContent = taskText; // Set the text of the list item

        // Create a delete button for the task
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn"); // Add a class for styling

        // Add event listener to the delete button
        deleteButton.addEventListener("click", () => {
            taskList.removeChild(newTask); // Remove the task when delete button is clicked
        });

        // Append the delete button to the new task
        newTask.appendChild(deleteButton);

        // Append the new task to the unordered list
        taskList.appendChild(newTask);

        // Clear the input field
        input.value = "";
    } else {
        // If the input is empty, show an alert
        alert("Please enter a task!");
    }
});
