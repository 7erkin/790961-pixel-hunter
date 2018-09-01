export default class AbstractView {
  constructor() {
    this._element = null;
  }
  get template() {}
  render() {
    const container = document.createElement(`div`);
    container.innerHTML = this.template;
    return container;
  }
  bind() {}
  get element() {
    if (this._element !== null) {
      return this._element;
    }
    this._element = this.render();
    this.bind();
    return this._element;
  }
}

