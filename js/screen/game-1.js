import {changeScreen, handleAnswer} from '../lib/index';
import createScreen from './game-2';
import dataGame from '../data/games';
import gameState from '../data/state-of-game';
import images from '../data/images';
import answers from '../data/answers';
import takeAwayLife from '../business-logic/control-player-life';
import resultScreen from './stats';
import Game1View from '../view/game-1';
import startScreen from './intro';

export default () => {
  const view = new Game1View({
    gameState,
    dataGame,
    answers
  });
  const screen = view.element;
  view.onBack = () => changeScreen({
    nextScreen: startScreen
  });
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
  return screen;
};
