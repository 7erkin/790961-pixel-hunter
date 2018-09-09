import AbstractView from "./abstract/game";
import {isImageClicked} from '../lib/index';

export default class Game3View extends AbstractView {
  constructor(data) {
    super(data);
    this.data.quantityTasks = 3;
    this.data.taskType = 2;
    this.data.gameName = `game-3`;
  }
  onAnswer() {}
  onBack() {}
  bind() {
    const gameContent = this._element.querySelector(`.game__content`);
    gameContent.addEventListener(`click`, (evt) => {
      if (isImageClicked(evt)) {
        this.onAnswer(evt.target.src);
      }
    });
    this._element.querySelector(`.back`).addEventListener(`click`, this.onBack);
  }
}
