import AbstractView from './abstract/base';
import getStats from '../template/game/get-stats';

const QUANTITY_GAMES = 10;
const TimeLimit = {
  FAST: 10,
  SLOW: 20
};

const getTotalScore = (data) => {
  return `<tr>
    <td colspan="5" class="result__total  result__total--final">${Object.keys(data.Score).reduce((acc, key) => {
    acc += data.Score[key];
    return acc;
  }, 0)}</td>
  </tr>`;
};
const getBonusScore = (data) => {
  return `<tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${data.Stat.fast} <span class="stats__result stats__result--fast"></span></td>
          <td class="result__Points">× ${data.Point.FAST}</td>
          <td class="result__total">${data.Score.fast}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${data.Stat.life} <span class="stats__result stats__result--alive"></span></td>
          <td class="result__Points">× ${data.Point.LIFE}</td>
          <td class="result__total">${data.Score.life}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${data.Stat.slow} <span class="stats__result stats__result--slow"></span></td>
          <td class="result__Points">× ${data.Point.SLOW}</td>
          <td class="result__total">${data.Score.slow}</td>
        </tr>`;
};
const getGameStatus = (win) => {
  return win ? `WIN!` : `FAIL`;
};
const getGameStateScore = (Score, win) => {
  return win ? Score.correct : `FAIL`;
};
const getGameResult = (data) => {
  if (data.win) {
    return `${getBonusScore(data)} ${getTotalScore(data)}`;
  }
  return ``;
};
const getQuantityCorrectAnswer = (data) => {
  return data.filter((element) => {
    return element.status === `correct`;
  }).length;
};
const getQuantityFastAnswer = (answers) => {
  return answers.filter((answer) => {
    return answer.status === `correct` && answer.time <= TimeLimit.FAST;
  }).length;
};
const getQuantitySlowAnswer = (answers) => {
  return answers.filter((answer) => {
    return answer.status === `correct` && answer.time > TimeLimit.SLOW;
  }).length;
};
const isUserWin = (games) => {
  return games === QUANTITY_GAMES;
};

const Point = {
  CORRECT: 100,
  FAST: 50,
  SLOW: -50,
  LIFE: 50
};

export default class StatsView extends AbstractView {
  constructor(model) {
    super();
    this.data = model;
  }
  get template() {
    const win = isUserWin(this.data.gameState.games);
    const Stat = {
      correct: getQuantityCorrectAnswer(this.data.gameState.answers),
      fast: getQuantityFastAnswer(this.data.gameState.answers),
      slow: getQuantitySlowAnswer(this.data.gameState.answers),
      life: this.data.gameState.life
    };
    const Score = {
      correct: Stat.correct * Point.CORRECT,
      fast: Stat.fast * Point.FAST,
      slow: Stat.slow * Point.SLOW,
      life: Stat.life * Point.LIFE
    };
    return `  
        <header class="header">
            <button class="back">
              <span class="visually-hidden">Вернуться к началу</span>
              <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
                <use xlink:href="img/sprite.svg#arrow-left"></use>
              </svg>
              <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
                <use xlink:href="img/sprite.svg#logo-small"></use>
              </svg>
            </button>
          </header>
          <section class="result">
            <h2 class="result__title">${getGameStatus(win)}</h2>
            <table class="result__table">
              <tr>
                <td class="result__number">1.</td>
                <td colspan="2">
                  ${getStats(this.data.gameState.answers)}
                </td>
                <td class="result__Points">× 100</td>
                <td class="result__total">${getGameStateScore(Score, win)}</td>
              </tr>
              ${getGameResult({Score, Stat, Point, win})}
            </table>
          </section>`;
  }
  onBack() {}
  bind() {
    this._element.querySelector(`.back`).addEventListener(`click`, this.onBack);
  }
}
