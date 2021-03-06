import GameAbstractView from './abstract/game';

export default class Game2View extends GameAbstractView {
  constructor(model, question) {
    super(model, question);
  }
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
  onAnswer() {}
  bind() {
    super.bind();
    const gameContent = this._element.querySelector(`.game__content`);
    gameContent.addEventListener(`click`, (evt) => {
      if (evt.target.type !== `radio`) {
        return;
      }
      this.onAnswer(this.answers);
    });
  }
}
