import StatsView from '../view/stats';

export default class StatsScreen {
  constructor(model) {
    this.model = model;
  }
  init() {
    this.view = new StatsView(this.model);
  }
  get element() {
    return this.view.element;
  }
}
