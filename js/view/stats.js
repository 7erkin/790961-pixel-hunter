import AbstractViewBackExtendtion from './abstract/base-back-extendtion';
import getStats from '../template/game/get-stats';

const TimeLimit = {
  FAST: 10,
  SLOW: 20
};

const computeScore = (score) => Object.keys(score).reduce((acc, key) => {
  acc += score[key];
  return acc;
}, 0);

const getLastGameTotalScore = (data) => {
  return `<tr>
    <td colspan="5" class="result__total  result__total--final">${computeScore(data.Score)}</td>
  </tr>`;
};
const getPreviousGameTotalScore = (data) => {
  if (!data.win) {
    return `   `;
  }
  return `<td class="result__total">${computeScore(data.Score)}</td>`;
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
const getPreviousResults = (results) => {
  return results.reduce((acc, element, index) => {
    const win = isUserWin(element);
    const Stat = {
      correct: getQuantityCorrectAnswer(element.answers),
      fast: getQuantityFastAnswer(element.answers),
      slow: getQuantitySlowAnswer(element.answers),
      life: element.life
    };
    const Score = {
      correct: Stat.correct * Point.CORRECT,
      fast: Stat.fast * Point.FAST,
      slow: Stat.slow * Point.SLOW,
      life: Stat.life * Point.LIFE
    };
    acc += `<table class="result__table">
      <tr>
        <td class="result__number">${index + 2}.</td>
        <td>
          <ul class="stats">
          ${getStats(element.answers)}
          </ul>
        </td>
        ${getPreviousGameTotalScore({win, Score})}
        <td class="result__total  result__total--final">${getGameStatus(win)}</td>
      </tr>
    </table>`;
    return acc;
  }, ``);
};
const getGameStatus = (win) => {
  return win ? `WIN` : `FAIL`;
};
const getGameStateScore = (Score, win) => {
  return win ? Score.correct : `FAIL`;
};
const getGameResult = (data) => {
  if (data.win) {
    return `${getBonusScore(data)} ${getLastGameTotalScore(data)}`;
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
const isUserWin = (data) => {
  if (data.life > 0) {
    return true;
  }
  if (data.answers.some((answer) => answer.status === `unknown`)) {
    return false;
  }
  if (data.answers.filter((answer) => answer.status === `wrong`) > 4) {
    return false;
  }
  return true;
};

const Point = {
  CORRECT: 100,
  FAST: 50,
  SLOW: -50,
  LIFE: 50
};

export default class StatsView extends AbstractViewBackExtendtion {
  constructor(model) {
    super();
    this.response = model;
  }
  get template() {
    const lastStats = this.response[this.response.length - 1];
    const win = isUserWin(lastStats);
    const Stat = {
      correct: getQuantityCorrectAnswer(lastStats.answers),
      fast: getQuantityFastAnswer(lastStats.answers),
      slow: getQuantitySlowAnswer(lastStats.answers),
      life: lastStats.life
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
                  ${getStats(lastStats.answers)}
                </td>
                <td class="result__Points">× 100</td>
                <td class="result__total">${getGameStateScore(Score, win)}</td>
              </tr>
              ${getGameResult({Score, Stat, Point, win})}
            </table>
            ${getPreviousResults(this.response.slice(0, this.response.length - 1))}
          </section>`;
  }
}
