import IntroView from '../view/intro';

export default class IntroScreen {
  constructor(callback) {
    this._callback = callback;
  }
  init() {
    this._view = new IntroView();
    this._view.onClick = () => this._callback();
  }
  get element() {
    return this._view.element;
  }
}
