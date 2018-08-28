import {changeScreen, genEventBack, handleAnswer, isRadioButtonPressed} from '../lib/index';
import createScreen from './game-2';
import dataGame from '../data/games';
import gameState from '../data/state-of-game';
import images from '../data/images';
import answers from '../data/answers';
import takeAwayLife from '../business-logic/control-player-life';
import stat from './stats';
import createGameScreenNode from '../template/main';

const quantityQuestion = 2;

export default () => {
  const game1Node = createGameScreenNode({
    taskType: 1,
    gameState,
    dataGame,
    quantityQuestion,
    answers
  });
  const gameContent = game1Node.querySelector(`.game__content`);
  const questionQuantity = gameContent.querySelectorAll(`.game__option`).length;
  const radioNodes = gameContent.querySelectorAll(`input[type="radio"]`);
  const isSwitchable = () => {
    const answerQuantity = Array.prototype.reduce.call(radioNodes, (acc, radioNode) => {
      if (radioNode.checked) {
        ++acc;
      }
      return acc;
    }, 0);
    return answerQuantity === questionQuantity;
  };

  gameContent.addEventListener(`click`, (evt) => {
    if (!isRadioButtonPressed(evt)) {
      return;
    }
    if (isSwitchable()) {
      const status = handleAnswer({
        questionForm: game1Node.querySelector(`.game__content`),
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
    }
  });
  game1Node.querySelector(`.back`).addEventListener(`click`, (evt) => {
    genEventBack(evt);
  });
  return game1Node;
};
