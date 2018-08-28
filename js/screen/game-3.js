import {changeScreen, genEventBack, handleAnswer, isImageClicked} from '../lib/index';
import createScreen from './game-1';
import dataGame from '../data/games';
import gameState from '../data/state-of-game';
import images from '../data/images';
import answers from '../data/answers';
import takeAwayLife from '../business-logic/control-player-life';
import stat from './stats';
import createGameScreenNode from '../template/main';


const quantityQuestion = 3;

export default () => {
  const game3Node = createGameScreenNode({
    taskType: 2,
    gameState,
    dataGame,
    quantityQuestion,
    answers
  });

  const gameContent = game3Node.querySelector(`.game__content`);
  gameContent.addEventListener(`click`, (evt) => {
    if (isImageClicked(evt)) {
      const status = handleAnswer({
        images,
        answers,
        gameState,
        choosenImage: evt.target,
        lifeModifier: takeAwayLife,
        taskType: 2
      });
      changeScreen({
        endScreen: stat,
        nextScreen: createScreen
      }, status);
    }
  });
  game3Node.querySelector(`.back`).addEventListener(`click`, genEventBack);
  return game3Node;
};
