import StatsView from '../view/stats';

export default class StatsScreen {
  constructor(model, response) {
    this._model = model;
    this._response = response;
  }
  init() {
    this._view = new StatsView(this._response);
    this._view.onBack = () => {
      this._model.flushGame();
    };
  }
  get element() {
    return this._view.element;
  }
}
