import state from '../data/game-state';
import Timer from './timer';
import {TimerEventName, AnswerStatus} from './lib';

const QUANTITY_GAMES = 10;
const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
const GameEventName = {
  NEXT_GAME: `nextGame`,
  END_GAME: `endGame`,
  TO_INTRO: `toIntro`,
  TIME_CHANGE: `timeChange`
};

const takeAwayLife = (gameState) => {
  --gameState.life;
};
const areLifesEnd = (life) => {
  return life < 0;
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

class GameModel {
  constructor() {
    this.gameState = deepCopy(state);
    this.listeners = new Map([
      [GameEventName.NEXT_GAME, new Set()],
      [GameEventName.END_GAME, new Set()],
      [GameEventName.TO_INTRO, new Set()],
      [GameEventName.TIME_CHANGE, new Set()],
    ]);
  }
  init() {
    this.flushListeners();
    this.timer = new Timer(deepCopy(state));
    this.timer.subscribe(TimerEventName.CHANGE, this.listeners.get(GameEventName.TIME_CHANGE));
    this.timer.subscribe(TimerEventName.END, new Set([this.setAnswer.bind(this)]));
    this.timer.start();
  }
  subscribe(event, listener) {
    this.listeners.get(event).add(listener);
  }
  setAnswer(answerStatus) {
    this.timer.stop();
    this.gameState.answers[this.gameState.games] = {
      status: answerStatus,
      time: this.timer.time
    };
    if (answerStatus !== AnswerStatus.CORRECT) {
      takeAwayLife(this.gameState);
      if (areLifesEnd(this.gameState.life)) {
        notifyAll(this.listeners.get(GameEventName.END_GAME));
        return;
      }
    }
    addGame(this.gameState);
    if (isGameFinished(this.gameState.games)) {
      notifyAll(this.listeners.get(GameEventName.END_GAME));
      return;
    }
    notifyAll(this.listeners.get(GameEventName.NEXT_GAME));
  }
  flushListeners() {
    clearSet(this.listeners.get(GameEventName.NEXT_GAME));
    clearSet(this.listeners.get(GameEventName.END_GAME));
    clearSet(this.listeners.get(GameEventName.TIME_CHANGE));
  }
  flushGame() {
    this.gameState = deepCopy(state);
    this.flushListeners();
    this.timer.stop();
    notifyAll(this.listeners.get(GameEventName.TO_INTRO));
  }
}

export default new GameModel();
