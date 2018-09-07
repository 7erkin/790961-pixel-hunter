import {changeScreen, handleAnswer} from '../lib/index';
import createScreen from './game-3';
import dataGame from '../data/games';
import gameState from '../data/state-of-game';
import images from '../data/images';
import answers from '../data/answers';
import takeAwayLife from '../business-logic/control-player-life';
import resultScreen from './stats';
import startScreen from './intro';
import Game2View from '../view/game-2';

export default () => {
  const view = new Game2View({
    gameState,
    dataGame,
    answers
  });
  const element = view.element;
  view.onAnswer = (nextAnswers) => {
    const status = handleAnswer({
      nextAnswers,
      images,
      gameState,
      answers,
      lifeModifier: takeAwayLife,
      taskType: 1
    });
    changeScreen({
      endScreen: resultScreen,
      nextScreen: createScreen
    }, status);
  };
  view.onBack = () => changeScreen({
    nextScreen: startScreen
  });
  return element;
};
