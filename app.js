//Selectors
const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const list = document.querySelector(".list");
const filterOption = document.querySelector('#status');

//Event Listeners

btn.addEventListener('click', addToDo);
list.addEventListener('click', deleteToDo);
filterOption.addEventListener('click', filterList);

//Functions

function addToDo(event) {
    event.preventDefault();

    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add('to-do');

    const newItem = document.createElement('li');
    newItem.innerText = input.value;
    newItem.classList.add('to-do-item');

    toDoDiv.appendChild(newItem);

    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add('trash-btn');
    toDoDiv.appendChild(trashBtn);

    //Add to localstorage

    saveList(input.value);

    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add('complete-btn');
    toDoDiv.appendChild(completedBtn);

    list.appendChild(toDoDiv);
    input.value = '';
}

function deleteToDo(e) {
    const item = e.target;
    
    if(item.classList[0] === 'trash-btn') {
        const toDo = item.parentElement;
        toDo.classList.add('fall');
        toDo.addEventListener('transitionend', function () {
            toDo.remove();
        })
    }

    if (item.classList[0] === 'complete-btn') {
        const toDo = item.parentElement;
        toDo.classList.toggle('completed');
    }
}

function filterList(e) {
    const todos = list.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value){
            case "all":
                todo.style = "display: flex";
                break;
            case "completed":
                if (todo.classList?.contains('completed')) {
                    todo.style = "display: flex;"
                }else {
                    todo.style = "display: none"
                }
                break;
            case "incomplete":
                if(!todo.classList?.contains("completed")){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                } 
        }
    });
}

function saveList(todo) {
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

}
