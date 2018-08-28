import getHeader from './get-header';
import getGameName from './get-game-name';
import getTask1 from './get-task-1';
import getTask2 from './get-task-2';
import getStats from './get-stats';
import {getElementFromTemplate} from '../lib/index';

const moduleMap = new Map([
  [1, getTask1],
  [2, getTask2]
]);

export default (data) => {
  const getTasks = moduleMap.get(data.taskType);
  return getElementFromTemplate(`
    ${getHeader(data.gameState)}
    <section class="game">
      ${getGameName(data.dataGame, `game-1`)}
      <form class="game__content">
        ${getTasks(data.quantityQuestion)}
      </form>
      ${getStats(data.answers)}
    </section>`);
};
