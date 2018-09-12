import AbstractViewBackExtendtion from "./abstract/game";
import {isImageClicked} from '../lib/index';

export default class Game3View extends AbstractViewBackExtendtion {
  constructor(model, question) {
    super(model, question);
  }
  onAnswer() {}
  bind() {
    const gameContent = this._element.querySelector(`.game__content`);
    gameContent.addEventListener(`click`, (evt) => {
      if (isImageClicked(evt)) {
        this.onAnswer(evt.target.src);
      }
    });
    this.bindBack();
  }
}
