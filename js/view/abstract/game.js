import AbstractViewBackExtendtion from './base-back-extendtion';
import getGameTemplate from '../../template/get-game';

const TIME_TO_FLASH = 6;
const FLASH_PERIOD = 500;

const isTimeToFlash = (time) => {
  return time === TIME_TO_FLASH;
};

export default class GameAbstractView extends AbstractViewBackExtendtion {
  constructor(model, question) {
    super();
    this._model = model;
    this._question = question;
    this._flashed = false;
  }
  destruct() {
    clearInterval(this._timerId);
  }
  updateTime(time) {
    if (!this._flashed && isTimeToFlash(time)) {
      this._flashed = true;
      const timerNode = this._element.querySelector(`.game__timer`);
      let temp = false;
      this._timerId = setInterval(() => {
        if (temp) {
          timerNode.style = `color: red;`;
          temp = false;
        } else {
          timerNode.style = `color: black;`;
          temp = true;
        }
      }, FLASH_PERIOD);
    }
    const timerNode = this.element.querySelector(`.game__timer`);
    timerNode.innerHTML = time;
  }
  get template() {
    return getGameTemplate(this._model, this._question);
  }
}
