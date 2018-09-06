import GameAbstractView from './abstract/game';
import {isRadioButtonPressed} from '../lib/index';

export default class Game1View extends GameAbstractView {
  constructor(data) {
    super(data);
    this._data.quantityTasks = 2;
    this._data.taskType = 1;
    this._data.gameName = `game-1`;
  }
  onAnswer() {}
  onBack() {}
  bind() {
    const gameContent = this._element.querySelector(`.game__content`);
    const questionQuantity = gameContent.querySelectorAll(`.game__option`).length;
    const radioNodes = gameContent.querySelectorAll(`input[type="radio"]`);
    const isSwitchable = () => {
      const answerQuantity = Array.prototype.reduce.call(radioNodes, (acc, radioNode) => {
        if (radioNode.checked) {
          ++acc;
        }
        return acc;
      }, 0);
      return answerQuantity === questionQuantity;
    };

    gameContent.addEventListener(`click`, (evt) => {
      if (!isRadioButtonPressed(evt)) {
        return;
      }
      if (isSwitchable()) {
        const questionContainer = this.element.querySelector(`.game__content`);
        this.onAnswer(questionContainer);
      }
    });
    this._element.querySelector(`.back`).addEventListener(`click`, this.onBack);
  }
}
