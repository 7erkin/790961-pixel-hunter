import {QuestionType} from '../lib/index';
import getHeader from './game/get-header';
import getGameTitle from './game/get-game-title';
import getTask1 from './game/get-task-1';
import getTask2 from './game/get-task-2';
import getStats from './game/get-stats';

const typeQuestionToGetterFunction = new Map([
  [QuestionType.TWO_OF_TWO, getTask1],
  [QuestionType.TINDER_LIKE, getTask1],
  [QuestionType.ONE_OF_THREE, getTask2]
]);

export default (model, question) => {
  const getTasks = typeQuestionToGetterFunction.get(question.type);
  return `
    ${getHeader(model.gameState)}
    <section class="game">
      ${getGameTitle(question)}
      <form class="game__content">
        ${getTasks(question)}
      </form>
      ${getStats(model.gameState.answers)}
    </section>`;
};
