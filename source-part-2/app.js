import { html, LitElement } from 'lit-element';

import './add-todo.js';
import './view-todo.js';

class App extends LitElement {
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      todos: Array
    };
  }

  constructor() {
    super();

    this.todos = [];
  }

  render() {
    return html`
      <section class="todoapp">
        <header class="header">
          <h1>todos</h1>
          <add-todo .addTodo="${(todo) => this.addTodo(todo)}"></add-todo>
        </header>

        <section class="main">
          <ul class="todo-list">
            ${this.todos.map(
              (todo) =>
                html`
                  <view-todo
                    .todo="${todo}"
                    .toggleCompletion="${() => this.toggleCompletion(todo)}"
                  ></view-todo>
                `
            )}
          </ul>
        </section>
      </section>
    `;
  }

  addTodo(todo) {
    this.todos = [...this.todos, todo];
  }

  toggleCompletion(todo) {
    this.todos = this.todos.map((t) => {
      if (todo == t) return { ...todo, completed: !todo.completed };

      return t;
    });
  }
}

window.customElements.define('todo-app', App);
