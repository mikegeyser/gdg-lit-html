import { html, render } from './node_modules/lit-html/lit-html.js';

let todos = [];

let handleAddTodo = (e) => {
  if (e.key !== 'Enter') return;

  todos.push({
    title: e.target.value,
    completed: false
  });
  e.target.value = '';

  update();
};

let toggleCompletion = (todo) => {
  todo.completed = true;

  update();
};

let addTodo = () => html`
  <input
    class="new-todo"
    placeholder="What needs to be done?"
    autofocus=""
    @keyup="${handleAddTodo}"
  />
`;

let viewTodo = (todo) => html`
  <li>
    <div class="view">
      <input
        class="toggle"
        type="checkbox"
        onclick="${toggleCompletion}"
        ?checked="${todo.completed}"
      />
      <label>
        ${todo.title}
      </label>
    </div>
  </li>
`;

let app = () => html`
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      ${addTodo()}
    </header>

    <section class="main">
      <ul class="todo-list">
        ${todos.map((todo) => viewTodo(todo))}
      </ul>
    </section>
  </section>
`;

let update = () => render(app(), document.body);
update();
