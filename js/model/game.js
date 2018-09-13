import state from '../data/game-state';
import Timer from './timer';
import {TimerEventName, AnswerStatus} from './lib';

const QUANTITY_GAMES = 10;
const GameEventName = {
  NEXT_GAME: `nextGame`,
  END_GAME: `endGame`,
  TO_INTRO: `toIntro`,
  TIME_CHANGE: `timeChange`,
};

/**
 * @description Делает глубокое копирование объекта
 * @param {Object} obj
 * @return {Object} Копия переданного в функцию объекта
 */
const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const takeAwayLife = (gameState) => {
  --gameState.life;
};
const areLifesEnd = (life) => {
  return life === 0;
};
const isGameFinished = (games) => {
  return games === QUANTITY_GAMES;
};
const addGame = (gameState) => {
  ++gameState.games;
};

const notifyAll = (listeners) => {
  for (const listener of new Set(listeners)) {
    listener();
  }
};
const clearSet = (set) => {
  for (const element of set) {
    set.delete(element);
  }
};

/**
 * @description Описывает Модель
 * @class GameModel
 */
class GameModel {
  constructor() {
    this.gameState = deepCopy(state);
    this._listener = new Map([
      [GameEventName.NEXT_GAME, new Set()],
      [GameEventName.END_GAME, new Set()],
      [GameEventName.TO_INTRO, new Set()],
      [GameEventName.TIME_CHANGE, new Set()],
    ]);
  }
  /**
   * @description Инициализирует состояние модели при предстоящей отрисовки очередного Вью
   * @memberof GameModel
   */
  init() {
    this.flushListeners();
    this._timer = new Timer(deepCopy(state));
    this._timer.subscribe(TimerEventName.CHANGE, this._listener.get(GameEventName.TIME_CHANGE));
    this._timer.subscribe(TimerEventName.END, new Set([this.setAnswer.bind(this)]));
    this._timer.start();
  }
  /**
   * @description Устанавливает подписчиков на события
   * @param {String} event
   * @param {Function} listener
   * @memberof GameModel
   */
  subscribe(event, listener) {
    this._listener.get(event).add(listener);
  }
  /**
   * @description Изменяет модель согласно ответу пользователя на вопрос
   * @param {String} answerStatus
   * @memberof GameModel
   */
  setAnswer(answerStatus) {
    this._timer.stop();
    this.gameState.answers[this.gameState.games] = {
      status: answerStatus,
      time: this._timer.time
    };
    if (answerStatus !== AnswerStatus.CORRECT) {
      if (areLifesEnd(this.gameState.life)) {
        notifyAll(this._listener.get(GameEventName.END_GAME));
        return;
      }
      takeAwayLife(this.gameState);
    }
    addGame(this.gameState);
    if (isGameFinished(this.gameState.games)) {
      notifyAll(this._listener.get(GameEventName.END_GAME));
      return;
    }
    notifyAll(this._listener.get(GameEventName.NEXT_GAME));
  }
  /**
   * @description Сбрасывает слушателей с событий
   * @memberof GameModel
   */
  flushListeners() {
    clearSet(this._listener.get(GameEventName.NEXT_GAME));
    clearSet(this._listener.get(GameEventName.END_GAME));
    clearSet(this._listener.get(GameEventName.TIME_CHANGE));
  }
  /**
   * @description Сбрасывает состояние игры
   * @memberof GameModel
   */
  flushGame() {
    this.gameState = deepCopy(state);
    this.flushListeners();
    this._timer.stop();
    notifyAll(this._listener.get(GameEventName.TO_INTRO));
  }
}

export default new GameModel();
