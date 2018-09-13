import GreetingView from '../view/greeting';

export default class GreetingScreen {
  constructor(callback) {
    this._callback = callback;
  }
  init() {
    this._view = new GreetingView();
    this._view.onClick = this._callback;
  }
  get element() {
    return this._view.element;
  }
}
