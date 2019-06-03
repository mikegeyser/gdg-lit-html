import { html, LitElement } from 'lit-element';

class ViewTodo extends LitElement {
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      todo: Object,
      toggleCompletion: Object
    };
  }

  render() {
    return html`
      <li>
        <div class="view">
          <input
            class="toggle"
            type="checkbox"
            @click="${(e) => this.toggleCompletion()}"
            ?checked="${this.todo.completed}"
          />
          <label>
            ${this.todo.title}
          </label>
        </div>
      </li>
    `;
  }
}

window.customElements.define('view-todo', ViewTodo);
