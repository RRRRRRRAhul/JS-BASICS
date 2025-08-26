// Load tasks from localStorage, or use default empty array if none exist
let toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];

// Initial call to display the tasks when the page loads
displayItems();

function addToDo(){
    // Get the input element for entering tasks
    let inputElement = document.querySelector('#todo-input');
    let inputDate = document.querySelector('#todo-date')
    // Get the value entered by the user
    let todoItemValue = inputElement.value;
    let todoItemDate = inputDate.value;
    // Add the new task to the array
    toDoList.push({item: todoItemValue, dueDate: todoItemDate});
    // Save updated list to localStorage
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
    // Clear the input field after adding
    inputElement.value = '';
    inputDate.value = '';
    // Update the displayed list
    displayItems();
}

function displayItems(){
    // Get the container where tasks will be displayed
    let displayElements = document.querySelector('.todo-container');
    // Variable to build the HTML for all tasks
    let newHTML = '';
    // Loop through the tasks array and create HTML for each task
    for(let i=0; i<toDoList.length; i++){
        newHTML += `
            <span>${toDoList[i].item}</span>
            <span>${toDoList[i].dueDate}</span>
            <!-- Delete button removes the task at index i and refreshes the list -->
            <button onclick="deleteToDo(${i})">Delete</button>
        `;
    }
    // Update the container with the new HTML (shows all current tasks)
    displayElements.innerHTML = newHTML;
}

// Function to delete a task and update localStorage
function deleteToDo(index) {
    toDoList.splice(index, 1);
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
    displayItems();
}