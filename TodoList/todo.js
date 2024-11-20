// Function to handle input event and enable/disable the Add button
export function inputFieldEngaged() {
    const inputField = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    addButton.disabled = inputField.value.trim().length === 0;
}

// Function to handle Add button click event
export function addInputToList() {
    const inputField = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    if (inputField.value.trim().length > 0) {
        const listItem = createListItem(inputField.value.trim());
        todoList.appendChild(listItem);
        inputField.value = '';
        inputFieldEngaged();
    }
}

// Function to create a list item element
export function createListItem(name) {
    const listItem = document.createElement('li');
    const heading = document.createElement('h2');
    heading.textContent = name;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', deleteButtonPressed);

    listItem.appendChild(heading);
    listItem.appendChild(deleteButton);

    return listItem;
}

// Function to handle the delete button click event
function deleteButtonPressed() {
    this.parentNode.remove();
}

// Add event listeners only if the elements exist
if (document.getElementById('todo-input') && document.getElementById('add-button')) {
    document.getElementById('todo-input').addEventListener('input', inputFieldEngaged);
    document.getElementById('add-button').addEventListener('click', addInputToList);
}
