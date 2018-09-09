import IntroView from '../view/intro';

export default class IntroScreen {
  constructor(callback) {
    this.callback = callback;
  }
  init() {
    this.view = new IntroView();
    this.view.onClick = () => this.callback();
  }
  get element() {
    return this.view.element;
  }
}
