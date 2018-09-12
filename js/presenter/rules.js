import RulesView from '../view/rules';

export default class RulesScreen {
  constructor(callback, model) {
    this.callback = callback;
    this.model = model;
  }
  init() {
    this.view = new RulesView();
    this.view.onClick = (userName) => {
      this.model.gameState.userName = userName;
      this.callback.showGame();
    };
    this.view.onBack = this.callback.showIntro;
  }
  get element() {
    return this.view.element;
  }
}
