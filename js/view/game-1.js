import GameAbstractView from './abstract/game';
import {isRadioButtonPressed} from '../lib/index';

export default class Game1View extends GameAbstractView {
  constructor(model, question) {
    super(model, question);
  }
  onAnswer() {}
  get answers() {
    const questionContainer = this.element.querySelector(`.game__content`);
    const questionsNodes = questionContainer.querySelectorAll(`.game__option`);
    return Array.from(questionsNodes).map((questionNode) => {
      const imageSource = questionNode.querySelector(`img`).src;
      const checkedRadioButton = Array.from(questionNode.querySelectorAll(`input`)).filter((radioButton) => {
        return radioButton.checked;
      });
      return {
        source: imageSource,
        answer: checkedRadioButton[0].value
      };
    });
  }
  bind() {
    super.bind();
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
        const newAnswers = this.answers;
        this.onAnswer(newAnswers);
      }
    });
  }
}
