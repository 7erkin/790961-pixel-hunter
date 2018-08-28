import {getElementFromTemplate, genEventBack} from '../lib/index';
import answers from '../data/answers';
import getStats from '../template/get-stats';
import gameState from '../data/state-of-game';

const quantityGames = 10;
const getQuantityCorrectAnswer = (data) => {
  return data.filter((element) => {
    return element === `correct`;
  }).length;
};
const getQuantityFastAnswer = () => {
  return 0;
};
const getQuantitySlowAnswer = () => {
  return 0;
};
const getTotalScore = (data) => {
  return `<tr>
  <td colspan="5" class="result__total  result__total--final">${Object.keys(data.score).reduce((acc, key) => {
    acc += data.score[key];
    return acc;
  }, 0)}</td>
</tr>`;
};
const isUserWin = (data) => {
  return data.games === quantityGames;
};
const getAnswerScore = (score, win) => {
  return win ? score.correct : `FAIL`;
};
const getBonusScore = (data) => {
  return `<tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${data.stat.fast} <span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× ${data.point.fast}</td>
        <td class="result__total">${data.score.fast}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${data.stat.life} <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× ${data.point.life}</td>
        <td class="result__total">${data.score.life}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${data.stat.slow} <span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">× ${data.point.slow}</td>
        <td class="result__total">${data.score.slow}</td>
      </tr>`;
};
const getGameResult = (data) => {
  if (data.win) {
    return `${getBonusScore(data)} ${getTotalScore(data)}`;
  }
  return ``;
};
const point = {
  'correct': 100,
  'fast': 50,
  'slow': -50,
  'life': 50
};

export default () => {
  const win = isUserWin(gameState);
  const stat = {
    correct: getQuantityCorrectAnswer(answers),
    fast: getQuantityFastAnswer(),
    slow: getQuantitySlowAnswer(),
    life: gameState.life
  };
  const score = {
    correct: stat.correct * point.correct,
    fast: stat.fast * point.fast,
    slow: stat.slow * point.slow,
    life: stat.life * point.life
  };
  const statsNode = getElementFromTemplate(`  
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
    <h2 class="result__title">Победа!</h2>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          ${getStats(answers)}
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">${getAnswerScore(score, win)}</td>
      </tr>
      ${getGameResult({score, stat, point, win})}
    </table>
  </section>`);

  statsNode.querySelector(`.back`).addEventListener(`click`, genEventBack);
  return statsNode;
};
