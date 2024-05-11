document.addEventListener('DOMContentLoaded', function() {
  const todoInput = document.getElementById('todoInput');
  const addTodoBtn = document.getElementById('addTodoBtn');
  const todoList = document.getElementById('todoList');
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.className = 'todo-item';
      li.innerHTML = `
        <span>${todo.text}</span>
        <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button>
      `;
      todoList.appendChild(li);
    });
  }

  renderTodos();
  addTodoBtn.addEventListener('click', function() {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
      todos.push({ text: todoText });
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
      todoInput.value = '';
    }
  });
  todoList.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
      const index = e.target.getAttribute('data-index');
      todos.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
    }
  });
});

