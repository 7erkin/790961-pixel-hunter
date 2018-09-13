import RulesView from '../view/rules';

export default class RulesScreen {
  constructor(callback, model) {
    this._callback = callback;
    this._model = model;
  }
  init() {
    this._view = new RulesView();
    this._view.onClick = (userName) => {
      this._model.gameState.userName = userName;
      this._callback.showGame();
    };
    this._view.onBack = this._callback.showIntro;
  }
  get element() {
    return this._view.element;
  }
}
