import getHeader from './game/get-header';
import getGameTitle from './game/get-game-title';
import getTask1 from './game/get-task-1';
import getTask2 from './game/get-task-2';
import getStats from './game/get-stats';
import titleGame from '../data/games';

const typeTaskToGetterTaskFunction = new Map([
  [1, getTask1],
  [2, getTask2]
]);

export default (data) => {
  const getTasks = typeTaskToGetterTaskFunction.get(data.taskType);
  return `
    ${getHeader(data)}
    <section class="game">
      ${getGameTitle(titleGame, data.gameName)}
      <form class="game__content">
        ${getTasks(data.quantityTasks)}
      </form>
      ${getStats(data.gameState.answers)}
    </section>`;
};
