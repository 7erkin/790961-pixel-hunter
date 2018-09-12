import AbstractViewBackExtendtion from './base-back-extendtion';
import getGameTemplate from '../../template/get-game';

export default class GameAbstractView extends AbstractViewBackExtendtion {
  constructor(model, question) {
    super();
    this.model = model;
    this.question = question;
  }
  updateTime(time) {
    const timerNode = this.element.querySelector(`.game__timer`);
    timerNode.innerHTML = time;
  }
  get template() {
    return getGameTemplate(this.model, this.question);
  }
}
