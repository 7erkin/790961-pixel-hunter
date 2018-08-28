import {changeScreen, genEventBack, handleAnswer} from '../lib/index';
import createScreen from './game-3';
import dataGame from '../data/games';
import gameState from '../data/state-of-game';
import images from '../data/images';
import answers from '../data/answers';
import takeAwayLife from '../business-logic/control-player-life';
import stat from './stats';
import createGameScreenNode from '../template/main';

const quantityQuestion = 1;

export default () => {
  const game2Node = createGameScreenNode({
    taskType: 1,
    gameState,
    dataGame,
    quantityQuestion,
    answers
  });

  const gameContent = game2Node.querySelector(`.game__content`);
  gameContent.addEventListener(`click`, (evt) => {
    if (evt.target.type !== `radio`) {
      return;
    }
    const status = handleAnswer({
      questionForm: game2Node.querySelector(`.game__content`),
      images,
      gameState,
      answers,
      lifeModifier: takeAwayLife,
      taskType: 1
    });
    changeScreen({
      endScreen: stat,
      nextScreen: createScreen
    }, status);
  });
  game2Node.querySelector(`.back`).addEventListener(`click`, (evt) => {
    genEventBack(evt);
  });

  return game2Node;
};
