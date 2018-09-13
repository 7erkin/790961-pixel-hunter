import {TimerEventName, AnswerStatus} from './lib';

const ONE_SECOND = 1000;

const isTimeOver = (time) => {
  return time < 0;
};
const notifyAll = (listeners, arg) => {
  for (const listener of listeners) {
    listener(arg);
  }
};

export default class Timer {
  constructor(gameState) {
    this._gameState = gameState;
    this._answerTime = gameState.time;
    this._listener = new Map();
  }
  subscribe(eventName, listener) {
    this._listener.set(eventName, listener);
  }
  start() {
    this._timerId = setInterval(() => {
      --this._gameState.time;
      if (isTimeOver(this._gameState.time)) {
        notifyAll(this._listener.get(TimerEventName.END), AnswerStatus.WRONG);
        return;
      }
      notifyAll(this._listener.get(TimerEventName.CHANGE), this._gameState.time);
    }, ONE_SECOND);
  }
  stop() {
    clearInterval(this._timerId);
  }
  get time() {
    return -this._gameState.time + this._answerTime;
  }
}
