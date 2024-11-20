// Import necessary functions from todo.js (assuming you would import these functions in practice)
document.body.innerHTML = `
  <input id="todo-input" />
  <button id="add-button" disabled></button>
  <ul id="todo-list"></ul>
`;

const inputField = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

// Functions from your todo.js script
function inputFieldEngaged() {
    addButton.disabled = inputField.value.length === 0;
}

function addInputToList() {
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
    deleteButton.addEventListener('click', deleteButtonPressed);

    listItem.appendChild(heading);
    listItem.appendChild(deleteButton);

    return listItem;
}

function deleteButtonPressed(event) {
    const listItem = event.target.parentNode; // Use event.target instead of this
    listItem.remove();
}

// Jest Test Suite
describe('Todo List functionality', () => {
    // Clear the todo list before each test to ensure a clean slate
    beforeEach(() => {
        todoList.innerHTML = ''; // This ensures the list is empty before each test
    });

    test('add button is disabled when input is empty', () => {
        inputField.value = '';
        inputFieldEngaged();
        expect(addButton.disabled).toBe(true);
    });

    test('add button is enabled when input has value', () => {
        inputField.value = 'New Task';
        inputFieldEngaged();
        expect(addButton.disabled).toBe(false);
    });

    test('clicking add button adds a list item', () => {
        inputField.value = 'New Task';
        addInputToList();
        const listItem = todoList.querySelector('li');
        expect(listItem).toBeTruthy();
        expect(listItem.querySelector('h2').textContent).toBe('New Task');
    });

    test('input field is cleared after adding a task', () => {
        inputField.value = 'New Task';
        addInputToList();
        expect(inputField.value).toBe('');
    });

    test('delete button removes the list item', () => {
        inputField.value = 'Task to Delete';
        addInputToList();

        // Check the initial state of the todo list
        expect(todoList.children.length).toBe(1); // Expecting only one item

        // Retrieve the list item and its delete button
        const listItem = todoList.querySelector('li');
        const deleteButton = listItem.querySelector('.delete-button');

        // Trigger the delete button click event manually
        deleteButton.dispatchEvent(new MouseEvent('click'));

        // Verify that the list item was removed
        expect(todoList.children.length).toBe(0); // Expecting the list to be empty after deletion
    });
});
