import { inputFieldEngaged, addInputToList, createListItem } from '../TodoList/todo.js';

describe('To Do List JS Functions', () => {
    let inputField;
    let addButton;
    let todoList;

    // Set up the DOM elements before each test
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="wrapper">
                <h1>To Do List</h1>
                <input id="todo-input" type="text" placeholder="Add new list item" />
                <button id="add-button" disabled>Add button</button>
                <ul id="todo-list"></ul>
            </div>
        `;
        inputField = document.getElementById('todo-input');
        addButton = document.getElementById('add-button');
        todoList = document.getElementById('todo-list');

        // Reinitialize event listeners in the test environment
        document.getElementById('todo-input').addEventListener('input', inputFieldEngaged);
        document.getElementById('add-button').addEventListener('click', addInputToList);
    });

    test('Add button is disabled when input is empty', () => {
        inputField.value = '';
        inputFieldEngaged();
        expect(addButton.disabled).toBe(true);
    });

    test('Add button is enabled when input is not empty', () => {
        inputField.value = 'New task';
        inputFieldEngaged();
        expect(addButton.disabled).toBe(false);
    });

    test('Input value is added to the list when Add button is clicked', () => {
        inputField.value = 'New task';
        addInputToList();
        expect(todoList.children.length).toBe(1);
        expect(todoList.children[0].textContent).toContain('New task');
    });

    test('Delete button removes list item', () => {
        inputField.value = 'New task';
        addInputToList();
        const deleteButton = todoList.querySelector('button');
        deleteButton.click();
        expect(todoList.children.length).toBe(0);
    });

    test('createListItem function correctly creates a list item', () => {
        const listItem = createListItem('Sample Task');
        expect(listItem).toBeInstanceOf(HTMLLIElement);
        expect(listItem.textContent).toContain('Sample Task');
        const deleteButton = listItem.querySelector('.delete-button');
        expect(deleteButton).toBeTruthy();
        expect(deleteButton.textContent).toBe('X');
    });
});
