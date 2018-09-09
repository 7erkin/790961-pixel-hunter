import AbstractView from './base';
import getGameTemplate from '../../template/get-game';

export default class GameAbstractView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }
  updateTime(time) {
    const timerNode = this.element.querySelector(`.game__timer`);
    timerNode.innerHTML = time;
  }
  get template() {
    return getGameTemplate(this.data);
  }
}
