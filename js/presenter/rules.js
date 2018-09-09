import RulesView from '../view/rules';

export default class RulesScreen {
  constructor(callback) {
    this.callback = callback;
  }
  init() {
    this.view = new RulesView();
    this.view.onClick = this.callback.showGame;
    this.view.onBack = this.callback.showIntro;
  }
  get element() {
    return this.view.element;
  }
}
