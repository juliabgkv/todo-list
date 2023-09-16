import api from './api.js';

const LIST_ITEM_COMPLETED_CLASS = 'list-item-completed';
const ACTIVE_CLASS = 'active';
const addForm = document.querySelector('#addForm');
const todoInput = document.querySelector('#todoInput');
const list = document.querySelector('#list');
const listItemTemplate = document.querySelector('#list-item-template');
const actionsBar = document.querySelector('#actionsBar');
const leftCounter = document.querySelector('#leftCounter');
const filters = {
    all: 'all',
    active: 'active',
    completed: 'completed'
};
let currFilter = filters.all;
let todos = [];

init();

list.addEventListener('click', onListClick);
actionsBar.addEventListener('click', onActionsBarClick);
addForm.addEventListener('submit', submitAddForm);


function onListClick(e) {
    const currItemElement = e.target.closest('.list-item');
    const key = currItemElement.dataset.itemId;

    if(e.target.classList.contains('delete-btn')) {
        api.deleteItem(key);
        todos = todos.filter(todo => todo.id != key);
        currItemElement.remove();
        updateCounter();
    } else if(currItemElement) {
        const currItem = todos.find(todo => todo.id == key);
        currItem.progress = currItem.progress === 'active' ? 'completed' : 'active';
        currItemElement.classList.toggle(LIST_ITEM_COMPLETED_CLASS);

        if(currFilter !== currItem.progress && currFilter !== 'all')
            currItemElement.remove();

        api.addItem(currItem);
        updateCounter();
    }
}

function onActionsBarClick(e) {
    const target = e.target;
    const btnIsActive = target.classList.contains(ACTIVE_CLASS);

    if(target.classList.contains('clear-completed-btn')) {
        const completedItems = todos.filter(todo => todo.progress === 'completed');
        completedItems.map(item => {
            api.deleteItem(item.id)
        });

        todos = todos.filter(todo => todo.progress === 'active');
        list.innerHTML = '';
        todos.map(renderTodo);
    } else if(target.classList.contains('filter-btn') && !btnIsActive) {
        if(target.classList.contains('all-btn')) {
            currFilter = filters.all;
            filterList(target);
        } else if(target.classList.contains('active-todos-btn')) {
            currFilter = filters.active;
            filterList(target);
        } else if(target.classList.contains('completed-todos-btn')) {
            currFilter = filters.completed;
            filterList(target);
        }
    }
}

function submitAddForm(e) {
    e.preventDefault();
    const input = todoInput.value.trim();

    if(input) {
        const newTodoObj = createNewTodoObject(input);
        todos.push(newTodoObj);
        api.addItem(newTodoObj);
        renderTodo(newTodoObj);
        addForm.reset();
        updateCounter();
    }
}

function createNewTodoObject(input) {
    return {
        id: new Date().valueOf(),
        value: input,
        progress: 'active'
    };
}

function init() {
    const todosObj = { ...localStorage };
    todos = parseObjToArr(todosObj);
    todos.map(renderTodo);
    updateCounter();
}

function parseObjToArr(obj) {
    return Object.keys(obj).map((key) => {
        const data = JSON.parse(obj[key]);
        const item = {
            id: key,
            value: data[0],
            progress: data[1]
        };
        return item;
    });
}

function filterList(currBtn) {
    list.innerHTML = '';
    let itemsList;

    if(currFilter === filters.all)
        itemsList = todos;
    else if(currFilter === filters.active)
        itemsList = todos.filter(todo => todo.progress === 'active');
    else if(currFilter === filters.completed)
        itemsList = todos.filter(todo => todo.progress === 'completed');

    itemsList.map(renderTodo);

    actionsBar.querySelector('.active').classList.remove(ACTIVE_CLASS);
    currBtn.classList.add(ACTIVE_CLASS);
}

function renderTodo(todo) {
    const clone = listItemTemplate.content.cloneNode(true);
    clone.querySelector('#item-content').textContent = todo.value;
    clone.querySelector('li').dataset.itemId = todo.id;

    if(todo.progress === 'completed')
        clone.querySelector('li').classList.add(LIST_ITEM_COMPLETED_CLASS);

    list.appendChild(clone);
}

function updateCounter() {
    leftCounter.innerText = todos.filter(todo => todo.progress === 'active').length;
}