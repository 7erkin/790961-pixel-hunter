import StatsView from '../view/stats';

export default class StatsScreen {
  constructor(callback, model, response) {
    this.callback = callback;
    this.model = model;
    this.response = response;
  }
  init() {
    this.view = new StatsView(this.response);
    this.view.onBack = () => {
      this.model.flushGame();
    };
  }
  get element() {
    return this.view.element;
  }
}
