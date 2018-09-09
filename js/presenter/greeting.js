import GreetingView from '../view/greeting';

export default class GreetingScreen {
  constructor(callback) {
    this.callback = callback;
  }
  init() {
    this.view = new GreetingView();
    this.view.onClick = this.callback;
  }
  get element() {
    return this.view.element;
  }
}
