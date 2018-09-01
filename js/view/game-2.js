import GameAbstractView from './abstract/game';

export default class Game2View extends GameAbstractView {
  constructor(data) {
    super(data);
    this._data.quantityTasks = 1;
    this._data.taskType = 1;
    this._data.gameName = `game-2`;
  }
  onAnswer() {}
  onBack() {}
  bind() {
    const gameContent = this._element.querySelector(`.game__content`);
    gameContent.addEventListener(`click`, (evt) => {
      if (evt.target.type !== `radio`) {
        return;
      }
      this.onAnswer();
    });
    this._element.querySelector(`.back`).addEventListener(`click`, this.onBack);
  }
}
