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
    this.gameState = gameState;
    this.answerTime = gameState.time;
    this.listeners = new Map();
  }
  subscribe(eventName, listener) {
    this.listeners.set(eventName, listener);
  }
  start() {
    this.timerId = setInterval(() => {
      --this.gameState.time;
      if (isTimeOver(this.gameState.time)) {
        notifyAll(this.listeners.get(TimerEventName.END), AnswerStatus.WRONG);
        return;
      }
      notifyAll(this.listeners.get(TimerEventName.CHANGE), this.gameState.time);
    }, ONE_SECOND);
  }
  stop() {
    clearInterval(this.timerId);
  }
  get time() {
    return -this.gameState.time + this.answerTime;
  }
}
