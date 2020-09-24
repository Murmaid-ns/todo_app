import uniqid from 'uniqid';

export default class TodoList {
  #todos = [];

  get todos() {
    return this.#todos;
  }

  set todos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    this.#todos = todos;
  }

  constructor() {
    const storageTodos = JSON.parse(localStorage.getItem('todos'));
    this.todos = storageTodos || [];
  }

  addTodo(text) {
    const todo = {
      id: uniqid(),
      text,
      isDone: false,
    };

    this.todos = [...this.todos, todo];
    return todo;
  }

  removeTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  checkTodo(id, isDone) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isDone,
        };
      }

      return todo;
    });
  }

  editTodo(id, text) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text,
        };
      }

      return todo;
    });
  }

  filterTodos(filter) {
    if (filter === 'completed') {
      return this.todos.filter((todo) => todo.isDone);
    }

    if (filter === 'uncompleted') {
      return this.todos.filter((todo) => !todo.isDone);
    }

    return this.todos;
  }

  switchBtn(button, arrBtn) {
    this.arrBtn = arrBtn;
    this.button = button;
    if (this.button.classList.contains('btn-outline-primary')) {
      this.arrBtn.forEach((el) => {
        el.classList.remove('btn-primary');
        el.classList.add('btn-outline-primary');
      });
      button.classList.add('btn-primary');
      button.classList.remove('btn-outline-primary');
    }
  }
}
