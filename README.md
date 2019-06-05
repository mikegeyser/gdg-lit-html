# 1. Initialise

> npm init

> npm install -D http-server

> npm install lit-html

> npm install todomvc-app-css todomvc-common

`"start" : "http-server"`

Create `index.html` and scaffold `html:5`.

```html
<link rel="stylesheet" href="./node_modules/todomvc-app-css/index.css" />
```

```html
<h1>Hello GDG!</h1>
```

# 2. Template literals

Create `app.js` and link it in the index.html.

```html
<script type="module" src="./app.js"></script>
```

```js
let gdg = 'Google Developer Group';
let hello = `<h1>Hello ${gdg}! It is currently ${new Date().toTimeString()}</h1>`;

document.body.append(hello);
```

```js
let wat = (staticParts, dynamicParts) => document.createElement('h1');
```

# 3. Lit and render

```js
import { html, render } from './node_modules/lit-html/lit-html.js';

let gdg = 'Google Developer Group';

let hello = html`
  <h1>Hello ${gdg}!</h1>
  It is currently <b>${new Date().toTimeString()}</b>
`;

render(hello, document.body);
```

# 4. TodoMVC App

```js
let todos = [];

let app = () => html``;

render(app(), document.body);
```

> Snippet: _html_app

```html
<section class="todoapp">
  <header class="header">
    <h1>todos</h1>
  </header>

  <section class="main"></section>
</section>
```

# 5. Add Todo

```js
let addTodo = () => html``;
```

> Snippet: _html_add_todo

```html
<input class="new-todo" placeholder="What needs to be done?" autofocus="" />
```

```html
${addTodo()}
```

```html
@keyup="${handleAddTodo}"
```

> Snippet: _handleAddTodo

```js
let handleAddTodo = (e) => {
  if (e.key !== 'Enter') return;

  todos.push({
    title: e.target.value,
    completed: false
  });

  e.target.value = '';

  update();
};
```

```js
let update = () => render(app(), document.body);
update();
```

# 6. Show the list

> Snippet: _data

```js
  { title: 'Initialise the app', completed: true },
  { title: 'Create a todo', completed: true },
  { title: 'List the todos', completed: true },
  { title: 'Mark a todo as completed', completed: false },
  { title: '????', completed: false },
  { title: 'Profit!', completed: false },
```

```html
<ul class="todo-list">
  ${todos.map((todo) => viewTodo(todo))}
</ul>
```

```js
let viewTodo = (todo) => html``;
```

> Snippet: _html_view_todo

```html
<li>
  <div class="view">
    <input class="toggle" type="checkbox" />
    <label></label>
  </div>
</li>
```

```js
<label>${todo.title}</label>
```

# 7. Mark a todo as done

```html
?checked="${todo.completed}" 
@click=${(e) => handleToggleCompleted(todo)}
```

```js
let handleToggleCompleted = (todo) => (todo.completed = !todo.completed);
```

# 8. Don't mutate state

```js
todos = [
  ...todos,
  {
    title: e.target.value,
    completed: false
  }
];
```

```js
let handleToggleCompleted = (todo) =>
  (todos = todos.map((t) => {
    if (t !== todo) return t;

    return {
      ...todo,
      completed: !todo.completed
    };
  }));
```

# 9. Web Components!

> npm install -D owc-dev-server

> npm install lit-element

```
    "start": "owc-dev-server"
```

```js
import { html, LitElement } from 'lit-element';
```

> Snippet: _component

```js
class App extends LitElement {
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {};
  }

  render() {
    return html``;
  }
}

window.customElements.define('todo-app', App);
```

> Copy paste the render method, and change `todo` to `this.todo`.

```js
return {
  todos: Array
};
```

```js
  constructor() {
    super();

    this.todos = [
      { title: 'Initialise the app', completed: true },
      { title: 'Create a todo', completed: true },
      { title: 'List the todos', completed: true },
      { title: 'Mark a todo as completed', completed: false },
      { title: '????', completed: false },
      { title: 'Profit!', completed: false }
    ];
  }
```

# 10. Add Todo

> Create file `add-todo.js`.

> Snippet: _component

```js
import { html, LitElement } from 'lit-element';

class AddTodo extends LitElement {
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {};
  }

  render() {
    return html``;
  }
}

window.customElements.define('add-todo', AddTodo);
```

Copy render method.

```html
@keyup="${(e) => this.handleAddTodo(e)}"
```

Copy handleAddTodo.

```js
  handleAddTodo(e) {
    if (e.key !== 'Enter') return;

    this.addTodo({
      title: e.target.value,
      completed: false
    });

    e.target.value = '';
  }
```

```js
  static get properties() {
    return {
      addTodo: Object
    };
  }
```

Add the corresponding side on `app.js`.

```js
  addTodo(todo) {
    this.todo = [...this.todos, todo];
  }
```

```html
<add-todo .addTodo="${(todo) => this.addTodo(todo)}"></add-todo>
```

```js
import './add-todo.js';
```

# 11. View Todo

Create `view-todo.js`.

> Snippet: _component

```js
import { html, LitElement } from 'lit-element';

class ViewTodo extends LitElement {
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {};
  }

  render() {
    return html``;
  }
}

window.customElements.define('view-todo', ViewTodo);
```

Copy render method.

```js
    ?checked="${this.todo.completed}"
    @click=${(e) => this.handleToggleCompleted(this.todo)}
```

```js
<label>${this.todo.title}</label>
```

Add the corresponding side on `app.js`.

```js
  handleToggleCompleted(todo) {
    this.todos = this.todos.map((t) => {
      if (t !== todo) return t;

      return {
        ...todo,
        completed: !todo.completed
      };
    });
  }
```

```js
import './view-todo.js';
```

```js
    ${this.todos.map(
        (todo) =>
        html`
            <view-todo
            .todo="${todo}"
            .handleToggleCompleted="${(todo) => this.handleToggleCompleted(todo)}"
            ></view-todo>
        `
    )}
```
