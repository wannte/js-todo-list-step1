let inputText = document.getElementById('new-todo-title');
const todoList = document.getElementById('todo-list');
let counterDisplayElem = document.querySelector('.todo-count');
let count = 0;


inputText.addEventListener("keydown", addTodo);

function addNewItem(list, itemText) {
    list.appendChild(createHtml(itemText));
}

function createHtml(itemText) {
    let kanban = document.createElement('li');
    kanban.innerHTML =
        `<div class="view">
            <input class="toggle" type="checkbox"/> 
                <label class="label">${itemText}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="" />`;
    let toggleElem = kanban.querySelector('.toggle');
    toggleElem.addEventListener('change', event => {
        if (event.target.checked) {
            kanban.classList.add('completed');
            toggleElem.setAttribute('checked', '');

        } else {
            kanban.classList.remove('completed');
            toggleElem.removeAttribute('checked');
        }
    });

    let destroyElem = kanban.querySelector('.destroy');
    destroyElem.addEventListener('click', () => {
        todoList.removeChild(kanban);
        count--;


        updateCountDisplay();
    })

    kanban.addEventListener("dblclick", () => {
        kanban.classList.add('editing');
    });
    const editText = kanban.querySelector('.edit');
    const labelText = kanban.querySelector('.label');
    editText.addEventListener('keydown', event => {
        if (event.key === "Enter") {
            labelText.innerHTML = editText.value;
            kanban.classList.remove('editing');
        } else if (event.key === "Escape") {
            editText.value = itemText;
            kanban.classList.remove('editing');
        }
    })
    return kanban
}

function addTodo(e) {
    if (e.key === "Enter") {
        let itemText = inputText.value;
        addNewItem(todoList, itemText);
        inputText.value = '';
        count++;
        updateCountDisplay();
    }
}

function updateCountDisplay() {
    counterDisplayElem.innerHTML = `총 <strong>${count}</strong> 개`;
}
