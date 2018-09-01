import getHeader from './game/get-header';
import getGameTitle from './game/get-game-title';
import getTask1 from './game/get-task-1';
import getTask2 from './game/get-task-2';
import getStats from './game/get-stats';

const moduleMap = new Map([
  [1, getTask1],
  [2, getTask2]
]);

export default (data) => {
  const getTasks = moduleMap.get(data.taskType);
  return `
    ${getHeader(data.gameState)}
    <section class="game">
      ${getGameTitle(data.dataGame, data.gameName)}
      <form class="game__content">
        ${getTasks(data.quantityTasks)}
      </form>
      ${getStats(data.answers)}
    </section>`;
};
