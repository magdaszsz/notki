//const todo = document.querySelector('.todo'); // pierwsza notka
const button = document.querySelector('.add-btn');// guzik dodaj
const deleteItems = document.querySelectorAll('#removeTodo'); // wszystkie znaczki 'kasuj'
const listOfTodos = document.querySelector('.todos-list');
const userInput = document.getElementById('input');  // pole na treść
const colors = ['rgba(181, 52, 113,1.0)', 'rgba(52, 73, 94,1.0)', 'rgba(241, 196, 15,1.0)', 'rgba(22, 160, 133,1.0)', 'rgba(155, 89, 182,1.0)', 'rgba(46, 204, 113,1.0)', 'rgba(231, 76, 60,1.0)']
const paleColors = ['rgba(103, 230, 220,1.0)', 'rgba(255, 204, 204,1.0)', 'rgba(255, 250, 101,1.0)', 'rgba(248, 239, 186,1.0)', 'rgba(203, 197, 234, 1.0)', 'rgba(120, 153,212, 1.0)', 'rgb(209, 112, 159)'];
const modal = document.querySelector('.alert'); // powiadomienie
const btnRemove = document.querySelector('.remove');

const todos = [];


/*************deleting todos **************** */

const deleteTodoHandler = (id) => {
    let todoIndex = 0;
    for(const todo of todos) {
        if(todo.id === id) {
            break;
        }
        todoIndex++;
    }
    todos.splice(todoIndex, 1);
    const listOfTodos = document.querySelector('.todos-list');
    listOfTodos.children[todoIndex].remove();
    if(todos.length < 4) {
        btnRemove.classList.remove('show');
    }
};




/******************rendering todos************** */

const renderTodoElement = (userInput, id) => {
    const newTodoElement = document.createElement('li');
    newTodoElement.style.background = `linear-gradient(-150deg, transparent 1.5em, ${paleColors[Math.floor(Math.random() * 7)]} 0`
    newTodoElement.className = 'todo';
    newTodoElement.innerHTML = `
    <i id="removeTodo" class="fas fa-times"></i><i class="fas fa-check"></i>
    ${userInput}`;
    newTodoElement.firstElementChild.addEventListener('click', deleteTodoHandler.bind(null, id));
    
    const listOfTodos = document.querySelector('.todos-list');
    listOfTodos.append(newTodoElement);
    
}
/**************clearing input ************ */

const clearInput = () => {
    userInput.value = '';
}

const addTodoHandler = () => {
    if(userInput.value.trim() === '') {
        modal.classList.add('show');
        userInput.classList.add('focused');
        return;
    }


   const newTodo = {
        input: userInput.value,
        id: Math.random(),
    };

    todos.push(newTodo);
    clearInput();
    renderTodoElement(newTodo.input, newTodo.id);
    console.log(todos.length);
    if(todos.length > 3) {
    btnRemove.classList.add('show');
}
    
}


button.addEventListener('click', addTodoHandler);

/************** trigger addTodoHandler on enter********* */
userInput.addEventListener('keyup', function(event) {
    if(event.keyCode === 13) {
       button.click();
    }
})

/*********   alert pop up ************ */

modal.addEventListener('click', function() {
    modal.classList.remove('show');
    userInput.classList.remove('focused');
})



btnRemove.addEventListener('click', function() {
    listOfTodos.innerHTML = '';
    btnRemove.classList.remove('show');
})
















