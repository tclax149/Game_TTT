

const inputField = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

// adding an event listener to inout field
inputField.addEventListener('input', inputFieldEngaged);

addButton.addEventListener('click', addInputToList);


function inputFieldEngaged() {
    // enable addbutton when input field is engaged
    addButton.disabled = inputField.value.length === 0;
}

function addInputToList() {

    // creating list item from input value
    const listItem = createListItem(inputField.value);

    todoList.append(listItem);
    inputField.value = '';
    addButton.disabled = true;
}


function createListItem(name) {
    const listItem = document.createElement('li');
    const heading = document.createElement('h2');
    heading.textContent = name;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function () {
        listItem.remove(); // Explicitly remove the parent list item
    });

    listItem.appendChild(heading);
    listItem.appendChild(deleteButton);

    return listItem;
}


function deleteButtonPressed(event) {
    const listItem = event.target.parentNode;
    listItem.remove();
}

